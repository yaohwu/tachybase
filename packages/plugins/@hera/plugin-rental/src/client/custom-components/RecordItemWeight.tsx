import React from 'react';
import { observer, useField, useForm } from '@tachybase/schema';

import { CustomComponentType, CustomFC } from '@hera/plugin-core/client';
import _ from 'lodash';

import { formatQuantity } from '../../utils/currencyUtils';

export const RecordItemWeight = observer((props) => {
  const form = useForm();
  const field = useField();
  const item = form.getValuesIn(field.path.slice(0, -2).entire);
  if (item?.product && item?.count) {
    const value = ((item.product.weight || 0) * item.count) / 1000;
    if (value) {
      return <span>{formatQuantity(value, 2) + '吨'}</span>;
    }
  }
  return <span> - </span>;
}) as CustomFC;

RecordItemWeight.displayName = 'RecordItemWeight';
RecordItemWeight.__componentType = CustomComponentType.CUSTOM_FIELD;
RecordItemWeight.__componentLabel = '记录单 - 明细 - 重量';
