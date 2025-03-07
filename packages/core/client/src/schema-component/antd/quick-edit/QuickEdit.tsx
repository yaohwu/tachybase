import React, { useMemo, useRef } from 'react';
import { FormItem } from '@tachybase/components';
import { createForm, Field, FormContext, observer, RecursionField, useField, useFieldSchema } from '@tachybase/schema';

import { createStyles } from 'antd-style';

import { useCollectionManager_deprecated } from '../../../collection-manager';
import { StablePopover } from '../popover';

const useStyles = createStyles(({ css }) => {
  return {
    overlay: css`
      padding-top: 0;
      .ant-popover-arrow {
        display: none;
      }
    `,
  };
});

export const Editable = observer(
  (props) => {
    const field: any = useField();
    const containerRef = useRef(null);
    const fieldSchema = useFieldSchema();
    const { styles } = useStyles();
    const value = field.value;
    const schema: any = {
      name: fieldSchema.name,
      'x-collection-field': fieldSchema['x-collection-field'],
      'x-component': 'CollectionField',
      'x-read-pretty': true,
      default: value,
      'x-component-props': fieldSchema['x-component-props'],
    };
    const form = useMemo(
      () =>
        createForm({
          values: {
            [fieldSchema.name]: value,
          },
        }),
      [field.value, fieldSchema['x-component-props']],
    );
    const getContainer = () => {
      return containerRef.current;
    };

    const modifiedChildren = React.Children.map(props.children, (child) => {
      if (React.isValidElement(child)) {
        //@ts-ignore
        return React.cloneElement(child, { getContainer });
      }
      return child;
    });

    return (
      <FormItem {...props} labelStyle={{ display: 'none' }}>
        <StablePopover
          content={
            <div style={{ width: '100%', height: '100%', minWidth: 500 }}>
              <div ref={containerRef}>{modifiedChildren}</div>
            </div>
          }
          trigger="click"
          placement={'bottomLeft'}
          overlayClassName={styles.overlay}
        >
          <div style={{ minHeight: 30, padding: '0 8px' }}>
            <FormContext.Provider value={form}>
              <RecursionField schema={schema} name={fieldSchema.name} />
            </FormContext.Provider>
          </div>
        </StablePopover>
      </FormItem>
    );
  },
  { displayName: 'Editable' },
);

export const QuickEdit = observer(
  (props) => {
    const field = useField<Field>();
    const { getCollectionJoinField } = useCollectionManager_deprecated();
    const fieldSchema = useFieldSchema();
    const collectionField = getCollectionJoinField(fieldSchema['x-collection-field']);
    if (!collectionField) {
      return null;
    }
    return field.editable ? <Editable {...props} /> : <FormItem {...props} style={{ padding: '0 8px' }} />;
  },
  { displayName: 'QuickEdit' },
);
