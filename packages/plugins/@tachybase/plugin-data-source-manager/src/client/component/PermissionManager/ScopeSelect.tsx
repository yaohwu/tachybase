import React, { createContext, useContext, useMemo, useState } from 'react';
import { FormProvider, SchemaComponent, useRecord } from '@tachybase/client';
import { createForm } from '@tachybase/schema';

import { getScopesSchema } from './schemas/scopes';

const RolesResourcesScopesSelectedRowKeysContext = createContext(null);
RolesResourcesScopesSelectedRowKeysContext.displayName = 'RolesResourcesScopesSelectedRowKeysContext';

const RolesResourcesScopesSelectedRowKeysProvider: React.FC = (props) => {
  const [keys, setKeys] = useState([]);
  return (
    <RolesResourcesScopesSelectedRowKeysContext.Provider value={[keys, setKeys]}>
      {props.children}
    </RolesResourcesScopesSelectedRowKeysContext.Provider>
  );
};

export const useRolesResourcesScopesSelectedRowKeys = () => {
  return useContext(RolesResourcesScopesSelectedRowKeysContext);
};

export const ScopeSelect = (props) => {
  const form = useMemo(
    () =>
      createForm({
        values: {
          scope: props.value,
        },
      }),
    [],
  );

  const { key } = useRecord();
  const scopesSchema = getScopesSchema(key);
  return (
    <FormProvider form={form}>
      <SchemaComponent
        components={{ RolesResourcesScopesSelectedRowKeysProvider }}
        scope={{
          onChange(value) {
            props?.onChange?.(value);
          },
        }}
        schema={scopesSchema}
      />
    </FormProvider>
  );
};
