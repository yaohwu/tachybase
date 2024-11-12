import React, { useContext } from 'react';
import {
  RemoteSchemaComponent,
  SchemaComponent,
  SchemaComponentProvider,
  useFormBlockContext,
} from '@tachybase/client';
import { useForm } from '@tachybase/schema';

import { DetailsBlockProvider } from '../../../../../components';
import { FormBlockProvider } from '../../../common/FormBlock.provider';
import { ContextWithActionEnabled } from '../../approval-common/WithActionEnabled.provider';
import { SchemaComponentContextProvider } from '../common/SchemaComponent.provider';
import { getSchemaActionLaunchContent } from './ActionLaunchContent.schema';
import { ProviderActionResubmit } from './ActionResubmit.provider';
import { useActionResubmit } from './hooks/useActionResubmit';
import { useDestroyAction } from './hooks/useDestroyAction';
import { useFormBlockProps } from './hooks/useFormBlockProps';
import { useSubmitUpdate } from './hooks/useSubmitUpdate';
import { useWithdrawAction } from './hooks/useWithdrawAction';
import { ActionBarProvider } from './Pd.ActionBar';
import { ApplyActionStatusProvider } from './Pd.ApplyActionStatus';
import { WithdrawActionProvider } from './Pd.WithdrawAction';

export const ViewActionLaunchContent = (props) => {
  const { approval, workflow } = props;
  const { actionEnabled } = useContext(ContextWithActionEnabled);

  const schema = getSchemaActionLaunchContent({ approval, workflow, needHideProcess: actionEnabled });

  return (
    <SchemaComponent
      schema={schema}
      components={{
        SchemaComponentProvider,
        RemoteSchemaComponent,
        SchemaComponentContextProvider,
        FormBlockProvider,
        ActionBarProvider,
        ApplyActionStatusProvider,
        WithdrawActionProvider,
        DetailsBlockProvider,
        ProviderActionResubmit,
      }}
      scope={{
        useForm,
        useSubmit: useSubmitUpdate,
        useFormBlockProps,
        useDetailsBlockProps: useFormBlockContext,
        useWithdrawAction,
        useDestroyAction,
        useActionResubmit,
      }}
    />
  );
};
