import { ISchema, uid } from '@tachybase/schema';

export const createTableBlockUISchema = (options: {
  dataSource: string;
  collectionName?: string;
  rowKey?: string;
  association?: string;
}): ISchema => {
  const { collectionName, dataSource, rowKey, association } = options;

  if (!dataSource) {
    throw new Error('dataSource is required');
  }

  return {
    type: 'void',
    'x-decorator': 'TableBlockProvider',
    'x-acl-action': `${association || collectionName}:list`,
    'x-use-decorator-props': 'useTableBlockDecoratorProps',
    'x-decorator-props': {
      collection: collectionName,
      association,
      dataSource,
      action: 'list',
      params: {
        pageSize: 20,
      },
      rowKey,
      showIndex: true,
      dragSort: false,
    },
    'x-toolbar': 'BlockSchemaToolbar',
    'x-settings': 'blockSettings:table',
    'x-component': 'CardItem',
    'x-filter-targets': [],
    properties: {
      actions: {
        type: 'void',
        'x-initializer': 'table:configureActions',
        'x-component': 'ActionBar',
        'x-component-props': {
          style: {
            marginBottom: 'var(--tb-spacing)',
          },
        },
        properties: {},
      },
      [uid()]: {
        type: 'array',
        'x-initializer': 'table:configureColumns',
        'x-component': 'TableV2',
        'x-use-component-props': 'useTableBlockProps',
        'x-component-props': {
          rowKey: 'id',
          rowSelection: {
            type: 'checkbox',
          },
        },
        properties: {
          actions: {
            type: 'void',
            title: '{{ t("Actions") }}',
            'x-action-column': 'actions',
            'x-decorator': 'TableV2.Column.ActionBar',
            'x-component': 'TableV2.Column',
            'x-component-props': {
              width: 150,
              fixed: 'right',
            },
            'x-toolbar': 'TableColumnSchemaToolbar',
            'x-initializer': 'table:configureItemActions',
            'x-designer': 'TableV2.ActionColumnDesigner',
            'x-toolbar-props': {
              initializer: 'table:configureItemActions',
            },
            properties: {
              [uid()]: {
                type: 'void',
                'x-decorator': 'DndContext',
                'x-component': 'Space',
                'x-component-props': {
                  split: '|',
                },
              },
            },
          },
        },
      },
    },
  };
};
