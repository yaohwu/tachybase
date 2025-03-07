import React from 'react';
import { ArrayField, toArr, useField } from '@tachybase/schema';

import { defaultFieldNames } from './defaultFieldNames';

export const ReadPretty: React.FC<unknown> = (props: any) => {
  const { fieldNames = defaultFieldNames } = props;
  const values = toArr(props.value);
  const len = values.length;
  const field = useField<ArrayField>();
  let dataSource = field.dataSource;
  const data = [];
  for (const item of values) {
    if (typeof item === 'object') {
      data.push(item);
    } else {
      const curr = dataSource?.find((v) => v[fieldNames.value] === item);
      dataSource = curr?.[fieldNames.children] || [];
      data.push(curr || { label: item, value: item });
    }
  }
  return (
    <div>
      {data.map((item, index) => {
        return (
          <span key={index}>
            {typeof item === 'object' ? item[fieldNames.label] : item}
            {len > index + 1 && ' / '}
          </span>
        );
      })}
    </div>
  );
};
