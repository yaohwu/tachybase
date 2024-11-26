import React from 'react';
import {
  SchemaComponentOptions,
  useActionContext,
  useRecord,
  useRequest,
  useResourceActionContext,
  useResourceContext,
} from '@tachybase/client';
import { ISchema, uid } from '@tachybase/schema';

import { i18nText } from '../../utils';

const collection = {
  name: 'applications',
  targetKey: 'name',
  fields: [
    {
      type: 'uid',
      name: 'name',
      primaryKey: true,
      prefix: 'a',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: i18nText('App ID'),
        required: true,
        'x-component': 'Input',
        'x-validator': 'uid',
      },
    },
    {
      type: 'string',
      name: 'displayName',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: i18nText('App display name'),
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'pinned',
      interface: 'checkbox',
      uiSchema: {
        type: 'boolean',
        'x-content': i18nText('Pin to menu'),
        'x-component': 'Checkbox',
      },
    },
    {
      type: 'string',
      name: 'status',
      interface: 'radioGroup',
      defaultValue: 'pending',
      uiSchema: {
        type: 'string',
        title: i18nText('App status'),
        enum: [
          { label: 'Initializing', value: 'initializing' },
          { label: 'Initialized', value: 'initialized' },
          { label: 'Running', value: 'running' },
          { label: 'Commanding', value: 'commanding' },
          { label: 'Stopped', value: 'stopped' },
          { label: 'Error', value: 'error' },
          { label: 'Not found', value: 'not_found' },
        ],
        'x-component': 'Radio.Group',
      },
    },
    {
      type: 'string',
      name: 'isTemplate',
      interface: 'checkbox',
      uiSchema: {
        type: 'boolean',
        'x-content': i18nText('Is template'),
        'x-component': 'Checkbox',
      },
    },
  ],
};

export const useDestroy = () => {
  const { refresh } = useResourceActionContext();
  const { resource, targetKey } = useResourceContext();
  const { [targetKey]: filterByTk } = useRecord();
  return {
    async run() {
      await resource.destroy({ filterByTk });
      refresh();
    },
  };
};

export const useRefresh = () => {
  const { refresh } = useResourceActionContext();
  return {
    run() {
      refresh();
    },
  };
};

export const useDestroyAll = () => {
  const { state, setState, refresh } = useResourceActionContext();
  const { resource } = useResourceContext();
  return {
    async run() {
      await resource.destroy({
        filterByTk: state?.selectedRowKeys || [],
      });
      setState?.({ selectedRowKeys: [] });
      refresh();
    },
  };
};

export const formSchema: ISchema = {
  type: 'void',
  'x-component': 'div',
  properties: {
    displayName: {
      'x-component': 'CollectionField',
      'x-decorator': 'FormItem',
    },
    name: {
      'x-component': 'CollectionField',
      'x-decorator': 'FormItem',
      'x-disabled': '{{ !createOnly }}',
      'x-hidden': '{{ !admin }}',
    },
    // 'options.standaloneDeployment': {
    //   'x-component': 'Checkbox',
    //   'x-decorator': 'FormItem',
    //   'x-content': i18nText('Standalone deployment'),
    // },
    'options.autoStart': {
      title: i18nText('Start mode'),
      'x-component': 'Radio.Group',
      'x-decorator': 'FormItem',
      default: false,
      enum: [
        { label: i18nText('Start on first visit'), value: false },
        { label: i18nText('Start with main application'), value: true },
      ],
      'x-hidden': '{{ !admin }}',
    },
    cnamePrefix: {
      title: i18nText('Custom domain prefix'),
      'x-component': 'Input',
      'x-decorator': 'FormItem',
      'x-component-props': {
        addonAfter: `.${window.location.hostname}`,
      },
      'x-reactions': {
        dependencies: ['cname'],
        fulfill: {
          state: {
            value: '{{($deps[0] && $deps[0].replace(new RegExp("\\."+window.location.hostname+"$"), "")) || ""}}',
          },
        },
      },
    },
    cname: {
      'x-hidden': true,
      'x-component': 'Input',
      'x-decorator': 'FormItem',
      'x-read-pretty': true,
      // 依赖cnamePrefix取${cnamePrefix}.${window.location.hostname}
      'x-reactions': {
        dependencies: ['cnamePrefix'],
        fulfill: {
          state: {
            value: `{{$deps[0] ? $deps[0] + ".${window.location.hostname}" : null}}`,
          },
        },
      },
    },
    preset: {
      title: i18nText('Preset'),
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      default: 'tachybase',
      required: true,
      enum: [
        { label: i18nText('tachybase'), value: 'tachybase' },
        { label: i18nText('hera-rental'), value: 'hera-rental' },
        { label: i18nText('hera-sancongtou'), value: 'hera-sancongtou' },
      ],
      'x-hidden': true,
    },
    tmpl: {
      title: i18nText('Template'),
      'x-component': 'RemoteSelect',
      'x-component-props': {
        fieldNames: {
          label: 'displayName',
          value: 'name',
        },
        service: {
          resource: 'applications',
          params: {
            filter: {
              $or: [{ isTemplate: true }, { createdById: '{{ userId }}' }],
            },
          },
        },
      },
      'x-decorator': 'FormItem',
      'x-disabled': '{{ !createOnly }}',
    },
    'options.startEnvs': {
      type: 'string',
      title: i18nText('Start environment variables'),
      'x-component': 'Input.TextArea',
      'x-decorator': 'FormItem',
      'x-hidden': true, // main and multi use same env cause problem
    },
    pinned: {
      'x-component': 'CollectionField',
      'x-decorator': 'FormItem',
      'x-hidden': '{{ !admin }}',
    },
    isTemplate: {
      'x-component': 'CollectionField',
      'x-decorator': 'FormItem',
      'x-hidden': '{{ !admin }}',
    },
  },
};

export const tableActionColumnSchema: ISchema = {
  properties: {
    view: {
      type: 'void',
      'x-component': 'AppVisitor',
      'x-component-props': {
        admin: '{{ admin }}',
      },
    },
    update: {
      type: 'void',
      title: '{{t("Edit")}}',
      'x-component': 'Action.Link',
      'x-component-props': {},
      properties: {
        drawer: {
          type: 'void',
          'x-component': 'Action.Drawer',
          'x-decorator': 'Form',
          'x-decorator-props': {
            useValues: '{{ cm.useValuesFromRecord }}',
          },
          title: '{{t("Edit")}}',
          properties: {
            formSchema,
            footer: {
              type: 'void',
              'x-component': 'Action.Drawer.Footer',
              properties: {
                cancel: {
                  title: '{{t("Cancel")}}',
                  'x-component': 'Action',
                  'x-component-props': {
                    useAction: '{{ cm.useCancelAction }}',
                  },
                },
                submit: {
                  title: '{{t("Submit")}}',
                  'x-component': 'Action',
                  'x-component-props': {
                    type: 'primary',
                    useAction: '{{ cm.useUpdateAction }}',
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      type: 'void',
      title: '{{ t("Delete") }}',
      'x-component': 'Action.Link',
      'x-component-props': {
        confirm: {
          title: "{{t('Delete')}}",
          content: "{{t('Are you sure you want to delete it?')}}",
        },
        useAction: '{{cm.useDestroyAction}}',
      },
    },
  },
};

export const schema: ISchema = {
  type: 'object',
  properties: {
    [uid()]: {
      type: 'void',
      'x-decorator': 'ResourceActionProvider',
      'x-decorator-props': {
        collection,
        resourceName: 'applications',
        request: {
          resource: 'applications',
          action: 'list',
          params: {
            pageSize: 50,
            sort: ['-createdAt'],
            appends: [],
            filter: {
              createdById: '{{ admin ? undefined : userId }}',
            },
          },
        },
      },
      'x-component': 'CollectionProvider_deprecated',
      'x-component-props': {
        collection,
      },
      properties: {
        actions: {
          type: 'void',
          'x-component': 'ActionBar',
          'x-component-props': {
            style: {
              marginBottom: 16,
            },
          },
          properties: {
            refresh: {
              type: 'void',
              title: '{{t("Refresh")}}',
              'x-component': 'Action',
              'x-component-props': {
                icon: 'ReloadOutlined',
                useAction: useRefresh,
              },
            },
            delete: {
              type: 'void',
              title: '{{ t("Delete") }}',
              'x-component': 'Action',
              'x-component-props': {
                icon: 'DeleteOutlined',
                useAction: useDestroyAll,
                confirm: {
                  title: "{{t('Delete')}}",
                  content: "{{t('Are you sure you want to delete it?')}}",
                },
              },
              'x-hidden': '{{ !admin }}',
            },
            create: {
              type: 'void',
              title: '{{t("Add new")}}',
              'x-decorator': (props) =>
                React.createElement(SchemaComponentOptions, { ...props, scope: { createOnly: true } }),
              'x-component': 'Action',
              'x-component-props': {
                type: 'primary',
                icon: 'PlusOutlined',
              },
              properties: {
                drawer: {
                  type: 'void',
                  'x-component': 'Action.Drawer',
                  'x-decorator': 'Form',
                  'x-decorator-props': {
                    useValues(options) {
                      const ctx = useActionContext();
                      return useRequest(
                        () =>
                          Promise.resolve({
                            data: {
                              name: `a_${uid()}`,
                            },
                          }),
                        { ...options, refreshDeps: [ctx.visible] },
                      );
                    },
                  },
                  title: '{{t("Add new")}}',
                  properties: {
                    formSchema,
                    footer: {
                      type: 'void',
                      'x-component': 'Action.Drawer.Footer',
                      properties: {
                        cancel: {
                          title: '{{t("Cancel")}}',
                          'x-component': 'Action',
                          'x-component-props': {
                            useAction: '{{ cm.useCancelAction }}',
                          },
                        },
                        submit: {
                          title: '{{t("Submit")}}',
                          'x-component': 'Action',
                          'x-component-props': {
                            type: 'primary',
                            useAction: '{{ cm.useCreateAction }}',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        table: {
          type: 'void',
          'x-uid': 'input',
          'x-component': 'Table.Void',
          'x-component-props': {
            rowKey: 'name',
            rowSelection: {
              type: 'checkbox',
            },
            useDataSource: '{{ cm.useDataSourceFromRAC }}',
          },
          properties: {
            displayName: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                displayName: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                },
              },
            },
            name: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                name: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                },
              },
            },
            pinned: {
              type: 'void',
              title: i18nText('Pin to menu'),
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                pinned: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                },
              },
            },
            isTemplate: {
              type: 'void',
              title: i18nText('Is template'),
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                isTemplate: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                },
              },
            },
            status: {
              type: 'void',
              'x-decorator': 'Table.Column.Decorator',
              'x-component': 'Table.Column',
              properties: {
                status: {
                  type: 'string',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                },
              },
            },
            actions: {
              type: 'void',
              title: '{{t("Actions")}}',
              'x-component': 'Table.Column',
              properties: {
                actions: {
                  type: 'void',
                  'x-component': 'Space',
                  'x-component-props': {
                    split: '|',
                  },
                  ...tableActionColumnSchema,
                },
              },
            },
          },
        },
      },
    },
  },
};
