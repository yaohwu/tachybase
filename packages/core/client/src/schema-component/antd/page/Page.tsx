import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FormLayout } from '@tachybase/components';
import { Schema, SchemaOptionsContext, useFieldSchema } from '@tachybase/schema';

import { PlusOutlined } from '@ant-design/icons';
import { PageHeader as AntdPageHeader } from '@ant-design/pro-layout';
import { Button, Tabs } from 'antd';
import classNames from 'classnames';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { FormDialog } from '..';
import { useToken } from '../__builtins__';
import { useStyles as useAClStyles } from '../../../built-in/acl/style';
import { useDocumentTitle } from '../../../built-in/document-title';
import { FilterBlockProvider } from '../../../filter-provider/FilterProvider';
import { Icon } from '../../../icon';
import { useGetAriaLabelOfSchemaInitializer } from '../../../schema-initializer/hooks/useGetAriaLabelOfSchemaInitializer';
import { useGlobalTheme } from '../../../style/theme';
import { DndContext } from '../../common';
import { SortableItem } from '../../common/sortable-item';
import { SchemaComponent, SchemaComponentOptions } from '../../core';
import { useCompile, useDesignable } from '../../hooks';
import { ErrorFallback } from '../error-fallback';
import FixedBlock from './FixedBlock';
import { PageDesigner, PageTabDesigner } from './PageTabDesigner';
import { useStyles } from './style';

export const Page = (props) => {
  const { children, ...others } = props;
  const { t } = useTranslation();
  const compile = useCompile();
  const { title, setTitle } = useDocumentTitle();
  const fieldSchema = useFieldSchema();
  const dn = useDesignable();
  const { theme } = useGlobalTheme();
  const { getAriaLabel } = useGetAriaLabelOfSchemaInitializer();

  // react18  tab 动画会卡顿，所以第一个 tab 时，动画禁用，后面的 tab 才启用
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!title) {
      setTitle(t(fieldSchema.title));
    }
  }, [fieldSchema.title, title]);
  const disablePageHeader = fieldSchema['x-component-props']?.disablePageHeader;
  const enablePageTabs = fieldSchema['x-component-props']?.enablePageTabs;
  const hidePageTitle = fieldSchema['x-component-props']?.hidePageTitle;
  const options = useContext(SchemaOptionsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const activeKey = useMemo(
    () => searchParams.get('tab') || Object.keys(fieldSchema.properties || {}).shift(),
    [fieldSchema.properties, searchParams],
  );
  const [height, setHeight] = useState(0);
  const { wrapSSR, hashId, componentCls } = useStyles();
  const aclStyles = useAClStyles();

  const handleErrors = (error) => {
    console.error(error);
  };

  const pageHeaderTitle = hidePageTitle ? undefined : fieldSchema.title || compile(title);
  return wrapSSR(
    <FilterBlockProvider>
      <div className={`${componentCls} ${hashId} ${aclStyles.styles}`}>
        <PageDesigner title={fieldSchema.title || title} />
        <div
          ref={(ref) => {
            setHeight(Math.floor(ref?.getBoundingClientRect().height || 0) + 1);
          }}
        >
          {!disablePageHeader && (
            <AntdPageHeader
              className={classNames('pageHeaderCss', pageHeaderTitle || enablePageTabs ? '' : 'height0')}
              ghost={false}
              // 如果标题为空的时候会导致 PageHeader 不渲染，所以这里设置一个空白字符，然后再设置高度为 0
              title={pageHeaderTitle || ' '}
              {...others}
              footer={
                enablePageTabs && (
                  <DndContext>
                    <Tabs
                      size={'small'}
                      animated={hasMounted}
                      activeKey={activeKey}
                      onTabClick={(activeKey) => {
                        setLoading(true);
                        setSearchParams([['tab', activeKey]]);
                        setTimeout(() => {
                          setLoading(false);
                        }, 50);
                      }}
                      tabBarExtraContent={
                        dn.designable && (
                          <Button
                            aria-label={getAriaLabel('tabs')}
                            icon={<PlusOutlined />}
                            className={'addTabBtn'}
                            type={'dashed'}
                            onClick={async () => {
                              const values = await FormDialog(
                                t('Add tab'),
                                () => {
                                  return (
                                    <SchemaComponentOptions
                                      scope={options.scope}
                                      components={{ ...options.components }}
                                    >
                                      <FormLayout layout={'vertical'}>
                                        <SchemaComponent
                                          schema={{
                                            properties: {
                                              title: {
                                                title: t('Tab name'),
                                                'x-component': 'Input',
                                                'x-decorator': 'FormItem',
                                                required: true,
                                              },
                                              icon: {
                                                title: t('Icon'),
                                                'x-component': 'IconPicker',
                                                'x-decorator': 'FormItem',
                                              },
                                            },
                                          }}
                                        />
                                      </FormLayout>
                                    </SchemaComponentOptions>
                                  );
                                },
                                theme,
                              ).open({
                                initialValues: {},
                              });
                              const { title, icon } = values;
                              dn.insertBeforeEnd({
                                type: 'void',
                                title,
                                'x-icon': icon,
                                'x-component': 'Grid',
                                'x-initializer': 'page:addBlock',
                                properties: {},
                              });
                            }}
                          >
                            {t('Add tab')}
                          </Button>
                        )
                      }
                      items={fieldSchema.mapProperties((schema) => {
                        return {
                          label: (
                            <SortableItem
                              id={schema.name as string}
                              schema={schema}
                              className={classNames('tb-action-link', 'designerCss', props.className)}
                            >
                              {schema['x-icon'] && <Icon style={{ marginRight: 8 }} type={schema['x-icon']} />}
                              <span>{schema.title || t('Unnamed')}</span>
                              <PageTabDesigner schema={schema} />
                            </SortableItem>
                          ),
                          key: schema.name as string,
                        };
                      })}
                    />
                  </DndContext>
                )
              }
            />
          )}
        </div>
        <div className="tb-page-wrapper">
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleErrors}>
            {PageContent(loading, disablePageHeader, enablePageTabs, fieldSchema, activeKey, height, props)}
          </ErrorBoundary>
        </div>
      </div>
    </FilterBlockProvider>,
  );
};

Page.displayName = 'Page';

function PageContent(
  loading: boolean,
  disablePageHeader: any,
  enablePageTabs: any,
  fieldSchema: Schema<any, any, any, any, any, any, any, any, any>,
  activeKey: string,
  height: number,
  props: any,
): React.ReactNode {
  const { token } = useToken();

  if (loading) {
    return;
  }

  return !disablePageHeader && enablePageTabs ? (
    fieldSchema.mapProperties((schema) => {
      if (schema.name !== activeKey) return null;

      return (
        <FixedBlock key={schema.name} height={`calc(${height}px + 46px + ${token.marginLG}px * 2)`}>
          <SchemaComponent
            schema={
              new Schema({
                properties: {
                  [schema.name]: schema,
                },
              })
            }
          />
        </FixedBlock>
      );
    })
  ) : (
    <FixedBlock height={`calc(${height}px + 46px + ${token.marginLG}px * 2)`}>
      <div className={`pageWithFixedBlockCss tb-page-content`}>{props.children}</div>
    </FixedBlock>
  );
}
