import { CompatibleSchemaInitializer, gridRowColWrap, SchemaInitializer } from '@tachybase/client';

import { CreateFormBulkEditBlockInitializer } from './CreateFormBulkEditBlockInitializer';

/**
 * @deprecated
 * 之所以还保留，仅是为了兼容旧版 schema
 */
export const CreateFormBulkEditBlockInitializers: SchemaInitializer = new SchemaInitializer({
  name: 'CreateFormBulkEditBlockInitializers',
  wrap: gridRowColWrap,
  title: '{{t("Add block")}}',
  icon: 'PlusOutlined',
  items: [
    {
      type: 'itemGroup',
      title: '{{t("Data blocks")}}',
      name: 'dataBlocks',
      children: [
        {
          name: 'form',
          title: '{{t("Form")}}',
          Component: CreateFormBulkEditBlockInitializer,
        },
      ],
    },
    {
      type: 'itemGroup',
      title: '{{t("Other blocks")}}',
      name: 'otherBlocks',
      children: [
        {
          name: 'markdown',
          title: '{{t("Demonstration text")}}',
          Component: 'MarkdownBlockInitializer',
        },
      ],
    },
  ],
});

/**
 * @deprecated
 */
export const BulkEditBlockInitializers_deprecated = new CompatibleSchemaInitializer({
  name: 'BulkEditBlockInitializers',
  wrap: gridRowColWrap,
  title: '{{t("Add block")}}',
  icon: 'PlusOutlined',
  items: [
    {
      type: 'itemGroup',
      title: '{{t("Data blocks")}}',
      name: 'dataBlocks',
      children: [
        {
          name: 'form',
          title: '{{t("Form")}}',
          Component: CreateFormBulkEditBlockInitializer,
        },
      ],
    },
    {
      type: 'itemGroup',
      title: '{{t("Other blocks")}}',
      name: 'otherBlocks',
      children: [
        {
          name: 'markdown',
          title: '{{t("Demonstration text")}}',
          Component: 'MarkdownBlockInitializer',
        },
      ],
    },
  ],
});

export const bulkEditBlockInitializers = new CompatibleSchemaInitializer(
  {
    name: 'popup:bulkEdit:addBlock',
    wrap: gridRowColWrap,
    title: '{{t("Add block")}}',
    icon: 'PlusOutlined',
    items: [
      {
        type: 'itemGroup',
        title: '{{t("Data blocks")}}',
        name: 'dataBlocks',
        children: [
          {
            name: 'form',
            title: '{{t("Form")}}',
            Component: CreateFormBulkEditBlockInitializer,
          },
        ],
      },
      {
        type: 'itemGroup',
        title: '{{t("Other blocks")}}',
        name: 'otherBlocks',
        children: [
          {
            name: 'markdown',
            title: '{{t("Demonstration text")}}',
            Component: 'MarkdownBlockInitializer',
          },
        ],
      },
    ],
  },
  BulkEditBlockInitializers_deprecated,
);
