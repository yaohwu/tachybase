import React from 'react';
import { SchemaComponent, useCollectionRecordData } from '@tachybase/client';

import { NoticeDetailContent } from '../show-detail/NoticeDetail.schema';

const createSchema = ({ record }) => {
  const { id } = record;
  return {
    name: `notice-view-${id}`,
    type: 'void',
    'x-component': 'Action.Link',
    title: '{{t("View")}}',
    properties: {
      drawer: {
        type: 'void',
        'x-component': 'Action.Drawer',
        'x-component-props': {
          className: 'nb-action-popup',
        },
        properties: {
          content: {
            type: 'void',
            'x-component': 'NoticeDetailContent',
          },
        },
      },
    },
  };
};

export const ColumnAction = () => {
  const record = useCollectionRecordData();

  return (
    <SchemaComponent
      components={{
        NoticeDetailContent: NoticeDetailContent,
      }}
      schema={createSchema({ record })}
    />
  );
};
