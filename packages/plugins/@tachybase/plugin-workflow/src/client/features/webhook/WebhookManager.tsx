import React from 'react';
import {
  ExtendCollectionsProvider,
  ResourceActionProvider,
  SchemaComponent,
  useAPIClient,
  useRecord,
  WorkflowSelect,
} from '@tachybase/client';
import { CodeMirror } from '@tachybase/components';
import { ISchema, useForm } from '@tachybase/schema';

import { Button, Space } from 'antd';

import { ExecutionStatusColumn } from '../../components/ExecutionStatus';
import OpenDrawer from '../../components/OpenDrawer';
import { ExecutionLink } from '../../ExecutionLink';
import { lang } from '../../locale';
import { executionSchema } from '../../schemas/executions';
import { dispatchers } from './collections/dispatchers';

export const ExecutionResourceProvider = ({ request, filter = {}, ...others }) => {
  const webhook = useRecord();
  const props = {
    ...others,
    request: {
      ...request,
      params: {
        ...request?.params,
        filter: {
          ...request?.params?.filter,
          key: webhook.workflowKey,
        },
      },
    },
  };

  return <ResourceActionProvider {...props} />;
};

export const useTestActionProps = () => {
  const form = useForm();
  const webhook = useRecord();
  const api = useAPIClient();
  return {
    async onClick() {
      const res = await api.resource('webhooks').test({
        values: {
          body: JSON.parse(form.values.body),
          params: JSON.parse(form.values.params),
          name: webhook.name,
        },
      });
      alert(JSON.stringify(res.data));
    },
  };
};

const schema: ISchema = {
  type: 'void',
  properties: {
    table: {
      type: 'void',
      'x-decorator': 'TableBlockProvider',
      'x-acl-action': 'webhooks:list',
      'x-use-decorator-props': 'useTableBlockDecoratorProps',
      'x-decorator-props': {
        collection: dispatchers,
        dataSource: 'main',
        action: 'list',
        params: {
          pageSize: 20,
        },
        rowKey: 'id',
        showIndex: true,
        dragSort: false,
      },
      'x-component': 'CardItem',
      'x-filter-targets': [],
      properties: {
        actions: {
          type: 'void',
          'x-component': 'ActionBar',
          'x-component-props': {
            style: {
              marginBottom: 'var(--tb-spacing)',
            },
          },
          properties: {
            z8monqcdrdn: {
              type: 'void',
              'x-action': 'create',
              'x-acl-action': 'create',
              title: "{{t('Add new')}}",
              'x-component': 'Action',
              'x-decorator': 'ACLActionProvider',
              'x-component-props': {
                openMode: 'drawer',
                type: 'primary',
                component: 'CreateRecordAction',
                icon: 'PlusOutlined',
              },
              'x-align': 'right',
              'x-acl-action-props': {
                skipScopeCheck: true,
              },
              properties: {
                drawer: {
                  type: 'void',
                  title: '{{ t("Add record") }}',
                  'x-component': 'Action.Container',
                  'x-component-props': {
                    className: 'tb-action-popup',
                  },
                  properties: {
                    tabs: {
                      type: 'void',
                      'x-component': 'Tabs',
                      'x-component-props': {},
                      properties: {
                        tab1: {
                          type: 'void',
                          title: '{{t("Add new")}}',
                          'x-component': 'Tabs.TabPane',
                          'x-component-props': {},
                          properties: {
                            grid: {
                              type: 'void',
                              'x-component': 'Grid',
                              properties: {
                                ei36i9ijtdz: {
                                  type: 'void',
                                  'x-component': 'Grid.Row',
                                  properties: {
                                    uf8t2a39414: {
                                      type: 'void',
                                      'x-component': 'Grid.Col',
                                      properties: {
                                        xkkjkzn90fv: {
                                          type: 'void',
                                          'x-acl-action-props': {
                                            skipScopeCheck: true,
                                          },
                                          'x-acl-action': 'webhooks:create',
                                          'x-decorator': 'FormBlockProvider',
                                          'x-use-decorator-props': 'useCreateFormBlockDecoratorProps',
                                          'x-decorator-props': {
                                            dataSource: 'main',
                                            collection: dispatchers,
                                          },
                                          'x-component': 'CardItem',
                                          properties: {
                                            '5gbs46leolu': {
                                              type: 'void',
                                              'x-component': 'FormV2',
                                              'x-use-component-props': 'useCreateFormBlockProps',
                                              properties: {
                                                '9tt9z4mql3z': {
                                                  type: 'void',
                                                  'x-component': 'ActionBar',
                                                  'x-component-props': {
                                                    style: {
                                                      marginBottom: 24,
                                                    },
                                                  },
                                                  properties: {
                                                    gqrnx8zyjp1: {
                                                      title: '{{t("Submit")}}',
                                                      'x-action': 'submit',
                                                      'x-component': 'Action',
                                                      'x-component-props': {
                                                        type: 'primary',
                                                        htmlType: 'submit',
                                                        useProps: '{{ useCreateActionProps }}',
                                                      },
                                                      'x-action-settings': {
                                                        assignedValues: {},
                                                        triggerWorkflows: [],
                                                        pageMode: false,
                                                      },
                                                      type: 'void',
                                                    },
                                                  },
                                                },
                                                grid: {
                                                  type: 'void',
                                                  'x-component': 'Grid',
                                                  properties: {
                                                    '5sakq51jsle': {
                                                      type: 'void',
                                                      'x-component': 'Grid.Row',
                                                      properties: {
                                                        '6p28yhfkrbi': {
                                                          type: 'void',
                                                          'x-component': 'Grid.Col',
                                                          properties: {
                                                            name: {
                                                              type: 'string',
                                                              'x-component': 'CollectionField',
                                                              'x-decorator': 'FormItem',
                                                              'x-collection-field': 'webhooks.name',
                                                              'x-component-props': {},
                                                            },
                                                          },
                                                        },
                                                      },
                                                    },
                                                    y7idu8knr7g: {
                                                      type: 'void',
                                                      'x-component': 'Grid.Row',
                                                      properties: {
                                                        zbq1q6f85lf: {
                                                          type: 'void',
                                                          'x-component': 'Grid.Col',
                                                          properties: {
                                                            enabled: {
                                                              type: 'string',
                                                              'x-component': 'CollectionField',
                                                              'x-decorator': 'FormItem',
                                                              'x-collection-field': 'webhooks.enabled',
                                                              'x-component-props': {},
                                                            },
                                                          },
                                                        },
                                                      },
                                                    },
                                                    hmyd06j1xh1: {
                                                      type: 'void',
                                                      'x-component': 'Grid.Row',
                                                      properties: {
                                                        '6l4tt4kcu2h': {
                                                          type: 'void',
                                                          'x-component': 'Grid.Col',
                                                          properties: {
                                                            workflowKey: {
                                                              type: 'string',
                                                              'x-component': 'CollectionField',
                                                              'x-decorator': 'FormItem',
                                                              'x-collection-field': 'webhooks.workflowKey',
                                                            },
                                                          },
                                                        },
                                                      },
                                                    },
                                                    qrrbe5or0h5: {
                                                      type: 'void',
                                                      'x-component': 'Grid.Row',
                                                      properties: {
                                                        '5w93jhg5355': {
                                                          type: 'void',
                                                          'x-component': 'Grid.Col',
                                                          properties: {
                                                            type: {
                                                              type: 'string',
                                                              'x-component': 'CollectionField',
                                                              'x-decorator': 'FormItem',
                                                              'x-collection-field': 'webhooks.type',
                                                              'x-component-props': {},
                                                            },
                                                          },
                                                        },
                                                      },
                                                    },
                                                    resourceName: {
                                                      type: 'void',
                                                      'x-component': 'Grid.Row',
                                                      properties: {
                                                        '5w93jhg5355': {
                                                          type: 'void',
                                                          'x-component': 'Grid.Col',
                                                          properties: {
                                                            resourceName: {
                                                              type: 'string',
                                                              'x-component': 'CollectionField',
                                                              'x-decorator': 'FormItem',
                                                              'x-collection-field': 'webhooks.resourceName',
                                                              'x-reactions': [
                                                                {
                                                                  dependencies: ['.type'],
                                                                  fulfill: {
                                                                    state: {
                                                                      hidden: '{{ $deps[0] !== "action" }}',
                                                                    },
                                                                  },
                                                                },
                                                              ],
                                                              'x-component-props': {},
                                                            },
                                                          },
                                                        },
                                                      },
                                                    },
                                                    actionName: {
                                                      type: 'void',
                                                      'x-component': 'Grid.Row',
                                                      properties: {
                                                        '5w93jhg5355': {
                                                          type: 'void',
                                                          'x-component': 'Grid.Col',
                                                          properties: {
                                                            actionName: {
                                                              type: 'string',
                                                              'x-component': 'CollectionField',
                                                              'x-decorator': 'FormItem',
                                                              'x-collection-field': 'webhooks.actionName',
                                                              'x-reactions': [
                                                                {
                                                                  dependencies: ['.type'],
                                                                  fulfill: {
                                                                    state: {
                                                                      hidden: '{{ $deps[0] !== "action" }}',
                                                                    },
                                                                  },
                                                                },
                                                              ],
                                                              'x-component-props': {},
                                                            },
                                                          },
                                                        },
                                                      },
                                                    },
                                                    '38fm61ehxvn': {
                                                      type: 'void',
                                                      'x-component': 'Grid.Row',
                                                      properties: {
                                                        arovreokda8: {
                                                          type: 'void',
                                                          'x-component': 'Grid.Col',
                                                          properties: {
                                                            code: {
                                                              type: 'string',
                                                              'x-component': 'CollectionField',
                                                              'x-decorator': 'FormItem',
                                                              'x-decorator-props': {
                                                                tooltip:
                                                                  'ctx.request\nctx.body\nlib.JSON\nlib.Math\nlib.dayjs',
                                                              },
                                                              'x-collection-field': 'webhooks.code',
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
                    },
                  },
                },
              },
            },
          },
        },
        '8l8237xpji1': {
          type: 'array',
          'x-component': 'TableV2',
          'x-use-component-props': 'useTableBlockProps',
          'x-component-props': {
            rowKey: 'id',
            rowSelection: {
              type: 'checkbox',
            },
          },
          properties: {
            c5we84shjz1: {
              type: 'void',
              'x-decorator': 'TableV2.Column.Decorator',
              'x-component': 'TableV2.Column',
              'x-component-props': {
                width: 50,
              },
              properties: {
                name: {
                  'x-collection-field': 'webhooks.name',
                  'x-component': 'CollectionField',
                  'x-component-props': {
                    ellipsis: true,
                  },
                  'x-read-pretty': true,
                  'x-decorator': null,
                  'x-decorator-props': {
                    labelStyle: {
                      display: 'none',
                    },
                  },
                },
              },
            },
            q5o7ghhoepw: {
              type: 'void',
              'x-decorator': 'TableV2.Column.Decorator',
              'x-component': 'TableV2.Column',
              'x-component-props': {
                width: 20,
              },
              properties: {
                enabled: {
                  'x-collection-field': 'webhooks.enabled',
                  'x-component': 'CollectionField',
                  'x-component-props': {
                    ellipsis: true,
                  },
                  'x-read-pretty': true,
                  'x-decorator': null,
                  'x-decorator-props': {
                    labelStyle: {
                      display: 'none',
                    },
                  },
                },
              },
            },
            ud1epmyj09v: {
              type: 'void',
              'x-decorator': 'TableV2.Column.Decorator',
              'x-component': 'TableV2.Column',
              'x-component-props': {
                width: 20,
              },
              properties: {
                workflowKey: {
                  'x-collection-field': 'webhooks.workflowKey',
                  'x-component': 'CollectionField',
                  'x-read-pretty': true,
                  'x-decorator': 'OpenDrawer',
                  'x-decorator-props': {
                    component: function Com({ children, onClick }) {
                      const webhook = useRecord();
                      return (
                        <Space size="small">
                          {children}
                          {webhook.workflowKey ? (
                            <Button type="link" onClick={onClick} style={{ padding: 0, marginLeft: '-4px' }}>
                              ({lang('View executions')})
                            </Button>
                          ) : null}
                        </Space>
                      );
                    },
                  },
                  properties: {
                    drawer: executionSchema,
                  },
                },
              },
            },
            '8i54l0rnfth': {
              type: 'void',
              'x-decorator': 'TableV2.Column.Decorator',
              'x-component': 'TableV2.Column',
              'x-component-props': {
                width: 20,
              },
              properties: {
                type: {
                  'x-collection-field': 'webhooks.type',
                  'x-component': 'CollectionField',
                  'x-component-props': {},
                  'x-read-pretty': true,
                  'x-decorator': null,
                  'x-decorator-props': {
                    labelStyle: {
                      display: 'none',
                    },
                  },
                },
              },
            },
            xatpoztbh5h: {
              type: 'void',
              title: '{{ t("Actions") }}',
              'x-decorator': 'TableV2.Column.ActionBar',
              'x-component': 'TableV2.Column',
              'x-component-props': {
                width: 150,
                fixed: 'right',
              },
              'x-action-column': 'actions',
              properties: {
                gta931e187b: {
                  type: 'void',
                  'x-decorator': 'DndContext',
                  'x-component': 'Space',
                  'x-component-props': {
                    split: '|',
                  },
                  properties: {
                    oyggiyxrxlr: {
                      type: 'void',
                      title: '{{ t("Edit") }}',
                      'x-action': 'update',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        openMode: 'drawer',
                        icon: 'EditOutlined',
                      },
                      'x-decorator': 'ACLActionProvider',
                      properties: {
                        drawer: {
                          type: 'void',
                          title: '{{ t("Edit record") }}',
                          'x-component': 'Action.Container',
                          'x-component-props': {
                            className: 'tb-action-popup',
                          },
                          properties: {
                            tabs: {
                              type: 'void',
                              'x-component': 'Tabs',
                              'x-component-props': {},
                              properties: {
                                tab1: {
                                  type: 'void',
                                  title: '{{t("Edit")}}',
                                  'x-component': 'Tabs.TabPane',
                                  'x-component-props': {},
                                  properties: {
                                    grid: {
                                      type: 'void',
                                      'x-component': 'Grid',
                                      properties: {
                                        to6mk4v552h: {
                                          type: 'void',
                                          'x-component': 'Grid.Row',
                                          properties: {
                                            sqvdrzdbr7r: {
                                              type: 'void',
                                              'x-component': 'Grid.Col',
                                              properties: {
                                                '8uym9fty5oy': {
                                                  type: 'void',
                                                  'x-acl-action-props': {
                                                    skipScopeCheck: false,
                                                  },
                                                  'x-acl-action': 'webhooks:update',
                                                  'x-decorator': 'FormBlockProvider',
                                                  'x-use-decorator-props': 'useEditFormBlockDecoratorProps',
                                                  'x-decorator-props': {
                                                    action: 'get',
                                                    dataSource: 'main',
                                                    collection: dispatchers,
                                                  },
                                                  'x-component': 'CardItem',
                                                  properties: {
                                                    je28rbthifp: {
                                                      type: 'void',
                                                      'x-component': 'FormV2',
                                                      'x-use-component-props': 'useEditFormBlockProps',
                                                      properties: {
                                                        yviwt5e73dx: {
                                                          type: 'void',
                                                          'x-component': 'ActionBar',
                                                          'x-component-props': {
                                                            style: {
                                                              marginBottom: 'var(--tb-spacing)',
                                                            },
                                                          },
                                                          properties: {
                                                            unkmoqgvtvr: {
                                                              title: '{{ t("Submit") }}',
                                                              'x-action': 'submit',
                                                              'x-component': 'Action',
                                                              'x-use-component-props': 'useUpdateActionProps',
                                                              'x-component-props': {
                                                                type: 'primary',
                                                                htmlType: 'submit',
                                                              },
                                                              'x-action-settings': {
                                                                triggerWorkflows: [],
                                                                onSuccess: {
                                                                  manualClose: false,
                                                                  redirecting: false,
                                                                  successMessage: '{{t("Updated successfully")}}',
                                                                },
                                                                isDeltaChanged: false,
                                                              },
                                                              type: 'void',
                                                            },
                                                          },
                                                        },
                                                        grid: {
                                                          type: 'void',
                                                          'x-component': 'Grid',
                                                          properties: {
                                                            '5sakq51jsle': {
                                                              type: 'void',
                                                              'x-component': 'Grid.Row',
                                                              properties: {
                                                                '6p28yhfkrbi': {
                                                                  type: 'void',
                                                                  'x-component': 'Grid.Col',
                                                                  properties: {
                                                                    name: {
                                                                      type: 'string',
                                                                      'x-component': 'CollectionField',
                                                                      'x-decorator': 'FormItem',
                                                                      'x-collection-field': 'webhooks.name',
                                                                      'x-component-props': {},
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                            y7idu8knr7g: {
                                                              type: 'void',
                                                              'x-component': 'Grid.Row',
                                                              properties: {
                                                                zbq1q6f85lf: {
                                                                  type: 'void',
                                                                  'x-component': 'Grid.Col',
                                                                  properties: {
                                                                    enabled: {
                                                                      type: 'string',
                                                                      'x-component': 'CollectionField',
                                                                      'x-decorator': 'FormItem',
                                                                      'x-collection-field': 'webhooks.enabled',
                                                                      'x-component-props': {},
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                            hmyd06j1xh1: {
                                                              type: 'void',
                                                              'x-component': 'Grid.Row',
                                                              properties: {
                                                                '6l4tt4kcu2h': {
                                                                  type: 'void',
                                                                  'x-component': 'Grid.Col',
                                                                  properties: {
                                                                    workflowKey: {
                                                                      type: 'string',
                                                                      'x-component': 'CollectionField',
                                                                      'x-decorator': 'FormItem',
                                                                      'x-collection-field': 'webhooks.workflowKey',
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                            qrrbe5or0h5: {
                                                              type: 'void',
                                                              'x-component': 'Grid.Row',
                                                              properties: {
                                                                '5w93jhg5355': {
                                                                  type: 'void',
                                                                  'x-component': 'Grid.Col',
                                                                  properties: {
                                                                    type: {
                                                                      type: 'string',
                                                                      'x-component': 'CollectionField',
                                                                      'x-decorator': 'FormItem',
                                                                      'x-collection-field': 'webhooks.type',
                                                                      'x-component-props': {},
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                            resourceName: {
                                                              type: 'void',
                                                              'x-component': 'Grid.Row',
                                                              properties: {
                                                                '5w93jhg5355': {
                                                                  type: 'void',
                                                                  'x-component': 'Grid.Col',
                                                                  properties: {
                                                                    resourceName: {
                                                                      type: 'string',
                                                                      'x-component': 'CollectionField',
                                                                      'x-decorator': 'FormItem',
                                                                      'x-collection-field': 'webhooks.resourceName',
                                                                      'x-reactions': [
                                                                        {
                                                                          dependencies: ['.type'],
                                                                          fulfill: {
                                                                            state: {
                                                                              hidden: '{{ $deps[0] !== "action" }}',
                                                                            },
                                                                          },
                                                                        },
                                                                      ],
                                                                      'x-component-props': {},
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                            actionName: {
                                                              type: 'void',
                                                              'x-component': 'Grid.Row',
                                                              properties: {
                                                                '5w93jhg5355': {
                                                                  type: 'void',
                                                                  'x-component': 'Grid.Col',
                                                                  properties: {
                                                                    actionName: {
                                                                      type: 'string',
                                                                      'x-component': 'CollectionField',
                                                                      'x-decorator': 'FormItem',
                                                                      'x-collection-field': 'webhooks.actionName',
                                                                      'x-reactions': [
                                                                        {
                                                                          dependencies: ['.type'],
                                                                          fulfill: {
                                                                            state: {
                                                                              hidden: '{{ $deps[0] !== "action" }}',
                                                                            },
                                                                          },
                                                                        },
                                                                      ],
                                                                      'x-component-props': {},
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                            '38fm61ehxvn': {
                                                              type: 'void',
                                                              'x-component': 'Grid.Row',
                                                              properties: {
                                                                arovreokda8: {
                                                                  type: 'void',
                                                                  'x-component': 'Grid.Col',
                                                                  properties: {
                                                                    code: {
                                                                      type: 'string',
                                                                      'x-component': 'CollectionField',
                                                                      'x-decorator': 'FormItem',
                                                                      'x-decorator-props': {
                                                                        tooltip:
                                                                          'ctx.request\nctx.body\nlib.JSON\nlib.Math\nlib.dayjs',
                                                                      },
                                                                      'x-collection-field': 'webhooks.code',
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
                            },
                          },
                        },
                      },
                    },
                    q74i285l3sx: {
                      title: '{{ t("Delete") }}',
                      'x-action': 'destroy',
                      'x-component': 'Action.Link',
                      'x-use-component-props': 'useDestroyActionProps',
                      'x-component-props': {
                        icon: 'DeleteOutlined',
                        confirm: {
                          title: "{{t('Delete record')}}",
                          content: "{{t('Are you sure you want to delete it?')}}",
                        },
                      },
                      'x-action-settings': {
                        triggerWorkflows: [],
                      },
                      'x-decorator': 'ACLActionProvider',
                      type: 'void',
                    },
                    test: {
                      type: 'void',
                      title: '{{ t("Test") }}',
                      'x-action': 'update',
                      'x-component': 'Action.Link',
                      'x-component-props': {
                        openMode: 'drawer',
                        icon: 'EditOutlined',
                      },
                      'x-decorator': 'ACLActionProvider',
                      properties: {
                        drawer: {
                          type: 'void',
                          title: '{{ t("Edit record") }}',
                          'x-component': 'Action.Container',
                          'x-component-props': {
                            className: 'tb-action-popup',
                          },
                          properties: {
                            tabs: {
                              type: 'void',
                              'x-component': 'Tabs',
                              'x-component-props': {},
                              properties: {
                                tab1: {
                                  type: 'void',
                                  title: '{{t("Edit")}}',
                                  'x-component': 'Tabs.TabPane',
                                  'x-component-props': {},
                                  properties: {
                                    grid: {
                                      type: 'void',
                                      'x-component': 'Grid',
                                      properties: {
                                        to6mk4v552h: {
                                          type: 'void',
                                          'x-component': 'Grid.Row',
                                          properties: {
                                            sqvdrzdbr7r: {
                                              type: 'void',
                                              'x-component': 'Grid.Col',
                                              properties: {
                                                '8uym9fty5oy': {
                                                  type: 'void',
                                                  'x-acl-action-props': {
                                                    skipScopeCheck: false,
                                                  },
                                                  'x-acl-action': 'webhooks:update',
                                                  'x-decorator': 'FormBlockProvider',
                                                  'x-use-decorator-props': 'useEditFormBlockDecoratorProps',
                                                  'x-decorator-props': {
                                                    action: 'get',
                                                    dataSource: 'main',
                                                    collection: dispatchers,
                                                  },
                                                  'x-component': 'CardItem',
                                                  properties: {
                                                    je28rbthifp: {
                                                      type: 'void',
                                                      'x-component': 'FormV2',
                                                      'x-use-component-props': 'useEditFormBlockProps',
                                                      properties: {
                                                        yviwt5e73dx: {
                                                          type: 'void',
                                                          'x-component': 'ActionBar',
                                                          'x-component-props': {
                                                            style: {
                                                              marginBottom: 'var(--tb-spacing)',
                                                            },
                                                          },
                                                          properties: {
                                                            unkmoqgvtvr: {
                                                              title: '{{ t("Submit") }}',
                                                              'x-action': 'submit',
                                                              'x-component': 'Action',
                                                              'x-use-component-props': 'useTestActionProps',
                                                              'x-component-props': {
                                                                type: 'primary',
                                                                htmlType: 'submit',
                                                              },
                                                              'x-action-settings': {
                                                                triggerWorkflows: [],
                                                                onSuccess: {
                                                                  manualClose: false,
                                                                  redirecting: false,
                                                                  successMessage: '{{t("Updated successfully")}}',
                                                                },
                                                                isDeltaChanged: false,
                                                              },
                                                              type: 'void',
                                                            },
                                                          },
                                                        },
                                                        grid: {
                                                          type: 'void',
                                                          'x-component': 'Grid',
                                                          properties: {
                                                            '38fm61ehxvn': {
                                                              type: 'void',
                                                              'x-component': 'Grid.Row',
                                                              properties: {
                                                                arovreokda8: {
                                                                  type: 'void',
                                                                  'x-component': 'Grid.Col',
                                                                  properties: {
                                                                    params: {
                                                                      type: 'string',
                                                                      'x-component': 'CodeMirror',
                                                                      'x-component-props': {
                                                                        defaultValue: '{}',
                                                                      },
                                                                      'x-decorator': 'FormItem',
                                                                      'x-decorator-props': {
                                                                        label: 'query',
                                                                      },
                                                                    },
                                                                    body: {
                                                                      type: 'string',
                                                                      'x-component': 'CodeMirror',
                                                                      'x-component-props': {
                                                                        defaultValue: '{}',
                                                                      },
                                                                      'x-decorator': 'FormItem',
                                                                      'x-decorator-props': {
                                                                        label: 'body',
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
          },
        },
      },
    },
  },
};

export const WebhookManager = () => {
  return (
    <ExtendCollectionsProvider collections={[dispatchers]}>
      <SchemaComponent
        memoized
        schema={schema}
        scope={{ useTestActionProps }}
        components={{
          ExecutionStatusColumn,
          ExecutionResourceProvider,
          OpenDrawer,
          ExecutionLink,
          WorkflowSelect,
          CodeMirror,
        }}
      ></SchemaComponent>
    </ExtendCollectionsProvider>
  );
};
