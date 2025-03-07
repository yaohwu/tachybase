import React, { useContext, useMemo, useState } from 'react';
import { observer, RecursionField, useField, useFieldSchema } from '@tachybase/schema';

import { Select, Space } from 'antd';
import { differenceBy, unionBy } from 'lodash';

import {
  FormProvider,
  RecordPickerContext,
  RecordPickerProvider,
  SchemaComponentOptions,
  useActionContext,
} from '../..';
import { CollectionProvider_deprecated, RecordProvider, useCollectionRecordData, useFormBlockContext } from '../../../';
import {
  TableSelectorParamsProvider,
  useTableSelectorProps as useTsp,
} from '../../../block-provider/TableSelectorProvider';
import { useCompile } from '../../hooks';
import { ActionContextProvider } from '../action';
import { useAssociationFieldContext, useFieldNames, useInsertSchema } from './hooks';
import schema from './schema';
import { flatData, getLabelFormatValue, useLabelUiSchema } from './util';

export const useTableSelectorProps = () => {
  const field: any = useField();
  const {
    multiple,
    options = [],
    setSelectedRows,
    selectedRows: rcSelectRows = [],
    onChange,
  } = useContext(RecordPickerContext);
  const { onRowSelectionChange, rowKey = 'id', ...others } = useTsp();
  const { setVisible } = useActionContext();
  return {
    ...others,
    rowKey,
    rowSelection: {
      type: multiple ? 'checkbox' : 'radio',
      selectedRowKeys: rcSelectRows
        ?.filter((item) => options.every((row) => row[rowKey] !== item[rowKey]))
        .map((item) => item[rowKey]),
    },
    onRowSelectionChange(selectedRowKeys, selectedRows) {
      if (multiple) {
        const scopeRows = flatData(field.value) || [];
        const allSelectedRows = rcSelectRows || [];
        const otherRows = differenceBy(allSelectedRows, scopeRows, rowKey);
        const unionSelectedRows = unionBy(otherRows, selectedRows, rowKey);
        const unionSelectedRowKeys = unionSelectedRows.map((item) => item[rowKey]);
        setSelectedRows?.(unionSelectedRows);
        onRowSelectionChange?.(unionSelectedRowKeys, unionSelectedRows);
      } else {
        setSelectedRows?.(selectedRows);
        onRowSelectionChange?.(selectedRowKeys, selectedRows);
        onChange(selectedRows?.[0] || null);
        setVisible(false);
      }
    },
  };
};

export const InternalPicker = observer(
  (props: any) => {
    const { value, multiple, openSize, onChange, quickUpload, selectFile, shouldMountElement, ...others } = props;
    const field: any = useField();
    const fieldNames = useFieldNames(props);
    const [visibleSelector, setVisibleSelector] = useState(false);
    const fieldSchema = useFieldSchema();
    const insertSelector = useInsertSchema('Selector');
    const { options: collectionField } = useAssociationFieldContext();
    const { collectionName } = useFormBlockContext();
    const compile = useCompile();
    const labelUiSchema = useLabelUiSchema(collectionField, fieldNames?.label || 'label');
    const isAllowAddNew = fieldSchema['x-add-new'];
    const [selectedRows, setSelectedRows] = useState([]);
    const recordData = useCollectionRecordData();
    const options = useMemo(() => {
      if (value && Object.keys(value).length > 0) {
        const opts = (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean).map((option) => {
          const label = option?.[fieldNames.label];
          return {
            ...option,
            [fieldNames.label]: getLabelFormatValue(compile(labelUiSchema), compile(label)),
          };
        });
        return opts;
      }
      return [];
    }, [value, fieldNames?.label]);
    const pickerProps = {
      size: 'small',
      fieldNames,
      multiple: multiple !== false && ['o2m', 'm2m'].includes(collectionField?.interface),
      association: {
        target: collectionField?.target,
      },
      options,
      onChange: props?.onChange,
      selectedRows,
      setSelectedRows,
      collectionField,
      currentFormCollection: collectionName,
    };

    const getValue = () => {
      if (multiple == null) return null;
      return Array.isArray(value)
        ? value.filter(Boolean)?.map((v) => v?.[fieldNames.value])
        : value?.[fieldNames.value];
    };
    const getFilter = () => {
      const targetKey = collectionField?.targetKey || 'id';
      const list = options.map((option) => option[targetKey]).filter(Boolean);
      const filter = list.length ? { $and: [{ [`${targetKey}.$ne`]: list }] } : {};
      return filter;
    };
    const usePickActionProps = () => {
      const { setVisible } = useActionContext();
      const { multiple, selectedRows, onChange, options, collectionField } = useContext(RecordPickerContext);
      return {
        onClick() {
          if (multiple) {
            onChange(unionBy(selectedRows, options, collectionField?.targetKey || 'id'));
          } else {
            onChange(selectedRows?.[0] || null);
          }
          setVisible(false);
        },
        style: {
          display: multiple !== false && ['o2m', 'm2m'].includes(collectionField?.interface) ? 'block' : 'none',
        },
      };
    };
    return (
      <>
        <Space.Compact style={{ display: 'flex', lineHeight: '32px' }}>
          <div style={{ width: '100%' }}>
            <Select
              role="button"
              data-testid="select-data-picker"
              style={{ width: '100%' }}
              popupMatchSelectWidth={false}
              {...others}
              mode={multiple ? 'multiple' : props.mode}
              fieldNames={fieldNames}
              onDropdownVisibleChange={(open) => {
                insertSelector(schema.Selector);
                setVisibleSelector(true);
              }}
              allowClear
              onChange={(changed: any) => {
                if (!changed) {
                  const value = multiple ? [] : null;
                  onChange(value);
                  setSelectedRows(value);
                } else if (Array.isArray(changed)) {
                  if (!changed.length) {
                    onChange([]);
                    setSelectedRows([]);
                    return;
                  }
                  const values = options?.filter((option) => changed.includes(option[fieldNames.value]));
                  onChange(values);
                  setSelectedRows(values);
                }
              }}
              options={options}
              value={getValue()}
              open={false}
            />
          </div>
          {isAllowAddNew && (
            <RecordProvider isNew record={null} parent={recordData}>
              <RecursionField
                onlyRenderProperties
                basePath={field.address}
                schema={fieldSchema}
                filterProperties={(s) => {
                  return s['x-component'] === 'Action';
                }}
              />
            </RecordProvider>
          )}
        </Space.Compact>
        <ActionContextProvider
          value={{
            openSize: fieldSchema['x-component-props']?.['openSize'] || openSize,
            openMode: 'drawer',
            visible: visibleSelector,
            setVisible: setVisibleSelector,
          }}
        >
          <RecordPickerProvider {...pickerProps}>
            <CollectionProvider_deprecated name={collectionField?.target}>
              <FormProvider>
                <TableSelectorParamsProvider params={{ filter: getFilter() }}>
                  <SchemaComponentOptions
                    scope={{
                      usePickActionProps,
                      useTableSelectorProps,
                    }}
                  >
                    <RecursionField
                      onlyRenderProperties
                      basePath={field.address}
                      schema={fieldSchema}
                      filterProperties={(s) => {
                        return s['x-component'] === 'AssociationField.Selector';
                      }}
                    />
                  </SchemaComponentOptions>
                </TableSelectorParamsProvider>
              </FormProvider>
            </CollectionProvider_deprecated>
          </RecordPickerProvider>
        </ActionContextProvider>
      </>
    );
  },
  { displayName: 'InternalPicker' },
);
