import React, { useEffect, useState } from 'react';
import {
  CollectionFieldProvider,
  css,
  useCollection_deprecated,
  useCollectionField_deprecated,
  useCompile,
  useComponent,
  useFormBlockContext,
} from '@tachybase/client';
import { connect, Field, merge, useField, useFieldSchema } from '@tachybase/schema';

import { Checkbox, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

export const DeletedField = () => {
  const { t } = useTranslation();
  return <div style={{ color: '#ccc' }}>{t('The field has bee deleted')}</div>;
};
const InternalField: React.FC = (props) => {
  const field = useField<Field>();
  const fieldSchema = useFieldSchema();
  const { name, interface: interfaceType, uiSchema } = useCollectionField_deprecated();
  const component = useComponent(uiSchema?.['x-component']);
  const compile = useCompile();
  const setFieldProps = (key, value) => {
    field[key] = typeof field[key] === 'undefined' ? value : field[key];
  };
  const setRequired = () => {
    if (typeof fieldSchema['required'] === 'undefined') {
      field.required = !!uiSchema['required'];
    }
  };
  const ctx = useFormBlockContext();

  useEffect(() => {
    if (ctx?.field) {
      ctx.field.added = ctx.field.added || new Set();
      ctx.field.added.add(fieldSchema.name);
    }
  });

  useEffect(() => {
    if (!uiSchema) {
      return;
    }
    setFieldProps('content', uiSchema['x-content']);
    setFieldProps('description', uiSchema.description);
    setFieldProps('initialValue', uiSchema.default);
    // if (!field.validator && uiSchema['x-validator']) {
    //   field.validator = uiSchema['x-validator'];
    // }
    if (fieldSchema['x-disabled'] === true) {
      field.disabled = true;
    }
    if (fieldSchema['x-read-pretty'] === true) {
      field.readPretty = true;
    }
    setRequired();
    // @ts-ignore
    field.dataSource = uiSchema.enum;
    const originalProps = compile(uiSchema['x-component-props']) || {};
    const componentProps = merge(originalProps, field.componentProps || {});
    field.componentProps = componentProps;
    // field.component = [component, componentProps];
  }, [JSON.stringify(uiSchema)]);
  if (!uiSchema) {
    return null;
  }
  return React.createElement(component, props, props.children);
};

const CollectionField = connect((props) => {
  const fieldSchema = useFieldSchema();
  return (
    <CollectionFieldProvider name={fieldSchema.name}>
      <InternalField {...props} />
    </CollectionFieldProvider>
  );
});

export enum BulkEditFormItemValueType {
  RemainsTheSame = 1,
  ChangedTo,
  Clear,
  AddAttach,
}

export const BulkEditField = (props: any) => {
  const { t } = useTranslation();
  const fieldSchema = useFieldSchema();
  const field = useField<Field>();
  const [type, setType] = useState<number>(BulkEditFormItemValueType.ChangedTo);
  const [value, setValue] = useState(null);
  const { getField } = useCollection_deprecated();
  const collectionField = getField(fieldSchema.name) || {};

  useEffect(() => {
    field.value = { [type]: value };
  }, [type, value]);

  const typeChangeHandler = (val) => {
    setType(val);
  };

  const valueChangeHandler = (val) => {
    setValue(val?.target?.value ?? val?.target?.checked ?? val);
  };

  return (
    <Space
      className={css`
        display: flex;
        > .ant-space-item {
          width: 100%;
        }
      `}
    >
      <Select defaultValue={type} value={type} onChange={typeChangeHandler}>
        <Select.Option value={BulkEditFormItemValueType.RemainsTheSame}>{t('Remains the same')}</Select.Option>
        <Select.Option value={BulkEditFormItemValueType.ChangedTo}>{t('Changed to')}</Select.Option>
        <Select.Option value={BulkEditFormItemValueType.Clear}>{t('Clear')}</Select.Option>
        {/* {['subTable', 'linkTo', 'm2m', 'o2m', 'o2o', 'oho', 'obo', 'm2o'].includes(collectionField?.interface) && ( */}
        {/*   <Select.Option value={BulkEditFormItemValueType.AddAttach}>{t('Add attach')}</Select.Option> */}
        {/* )} */}
      </Select>
      {[BulkEditFormItemValueType.ChangedTo, BulkEditFormItemValueType.AddAttach].includes(type) &&
        collectionField?.interface !== 'checkbox' && (
          <CollectionField {...props} value={value} onChange={valueChangeHandler} style={{ minWidth: 150 }} />
        )}
      {[BulkEditFormItemValueType.ChangedTo, BulkEditFormItemValueType.AddAttach].includes(type) &&
        collectionField?.interface === 'checkbox' && <Checkbox checked={value} onChange={valueChangeHandler} />}
    </Space>
  );
};
