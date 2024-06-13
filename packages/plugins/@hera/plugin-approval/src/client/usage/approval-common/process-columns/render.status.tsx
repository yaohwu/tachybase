import React from 'react';
import { useCompile } from '@tachybase/client';

import { Tag } from 'antd';

import { APPROVAL_STATUS, approvalStatusConfigObj, ApprovalStatusEnumDict } from '../../../constants';
import { ColumnStatusComponent } from '../approval-columns/column.status';

export function renderColumnStatus(value, record, exist) {
  // return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const compile = useCompile();
  if (!exist) {
    const approvalStatusItem =
      ApprovalStatusEnumDict[
        record.status === APPROVAL_STATUS.DRAFT ? APPROVAL_STATUS.DRAFT : APPROVAL_STATUS.SUBMITTED
      ];
    return <Tag color={approvalStatusItem.color}>{compile(approvalStatusItem.label)}</Tag>;
  }

  const option = approvalStatusConfigObj[value];
  return <ColumnStatusComponent value={value} record={record} option={option} />;
}
