import React, { createContext, useContext } from 'react';
import { useRecord } from '@tachybase/client';

import { Approval } from '../approval-block/todos/Pd.ApprovalExecutions';

export const ApprovalContext = createContext<Partial<Approval>>({});

export function useApproval() {
  return useContext(ApprovalContext);
}
export function ApprovalDataProvider(props) {
  const { useData = useRecord } = props;
  const recordData = useData();
  return <ApprovalContext.Provider value={recordData}>{props.children}</ApprovalContext.Provider>;
}
