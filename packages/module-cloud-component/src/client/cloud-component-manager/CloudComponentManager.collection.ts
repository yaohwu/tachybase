import { CollectionOptions } from '@tachybase/client';

import MDEditor from '../component-editor/components/MDEditor';
import ReactEditor from '../component-editor/components/ReactEditor';

export const collection: CollectionOptions = {
  name: 'cloudComponents',
  title: '云组件',
  hidden: false,
  description: null,
  fields: [
    {
      name: 'id',
      type: 'bigInt',
      interface: 'integer',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      uiSchema: {
        type: 'number',
        title: '{{t("ID")}}',
        'x-component': 'InputNumber',
        'x-read-pretty': true,
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      interface: 'createdAt',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      field: 'createdAt',
      uiSchema: {
        type: 'datetime',
        title: '{{t("Created at")}}',
        'x-component': 'DatePicker',
        'x-component-props': {},
        'x-read-pretty': true,
      },
    },
    {
      name: 'createdBy',
      type: 'belongsTo',
      interface: 'createdBy',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      target: 'users',
      foreignKey: 'createdById',
      uiSchema: {
        type: 'object',
        title: '{{t("Created by")}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          fieldNames: {
            value: 'id',
            label: 'nickname',
          },
        },
        'x-read-pretty': true,
      },
      targetKey: 'id',
    },
    {
      name: 'updatedAt',
      type: 'date',
      interface: 'updatedAt',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      field: 'updatedAt',
      uiSchema: {
        type: 'string',
        title: '{{t("Last updated at")}}',
        'x-component': 'DatePicker',
        'x-component-props': {},
        'x-read-pretty': true,
      },
    },
    {
      name: 'updatedBy',
      type: 'belongsTo',
      interface: 'updatedBy',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      target: 'users',
      foreignKey: 'updatedById',
      uiSchema: {
        type: 'object',
        title: '{{t("Last updated by")}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          fieldNames: {
            value: 'id',
            label: 'nickname',
          },
        },
        'x-read-pretty': true,
      },
      targetKey: 'id',
    },
    {
      name: 'name',
      type: 'string',
      interface: 'input',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      uiSchema: {
        type: 'string',
        'x-component': 'Input',
        title: '组件名称',
      },
      unique: true,
      primaryKey: false,
    },
    {
      name: 'code',
      type: 'text',
      interface: 'textarea',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      uiSchema: {
        type: 'string',
        'x-component': ReactEditor,
        title: '组件代码',
      },
    },
    {
      name: 'data',
      type: 'json',
      interface: 'json',
      description: '组件测试数据，可以用来 mock 组件的数据',
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      defaultValue: null,
      uiSchema: {
        type: 'object',
        'x-component': 'Input.JSON',
        'x-component-props': {
          autoSize: {
            minRows: 5,
          },
        },
        default: '{}',
        title: '组件数据',
      },
      jsonb: false,
    },
    {
      name: 'description',
      type: 'text',
      interface: 'textarea',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      uiSchema: {
        type: 'string',
        'x-component': MDEditor,
        title: '组件文档',
      },
    },
    {
      name: 'enabled',
      type: 'boolean',
      interface: 'checkbox',
      description: null,
      collectionName: 'cloudComponents',
      parentKey: null,
      reverseKey: null,
      uiSchema: {
        'x-component-props': {
          showUnchecked: true,
        },
        type: 'boolean',
        'x-component': 'Checkbox',
        title: '是否启用',
      },
    },
  ],
  logging: true,
  autoGenId: true,
  createdAt: true,
  createdBy: true,
  updatedAt: true,
  updatedBy: true,
  template: 'general',
  view: false,
  schema: 'public',
  titleField: 'name',
  filterTargetKey: 'id',
};
