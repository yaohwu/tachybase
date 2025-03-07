import React, { createContext, useContext } from 'react';

import { Spin } from 'antd';

import { useRequest } from '../../../api-client';
import { SchemaComponent, SchemaComponentContext } from '../../../schema-component';
import { MenuItemsProvider } from './MenuItemsProvider';
import { PermissionProvider, SettingCenterPermissionProvider } from './PermisionProvider';
import { roleSchema } from './schemas/roles';

const AvailableActionsContext = createContext([]);
AvailableActionsContext.displayName = 'AvailableActionsContext';

const AvailableActionsProver = (props) => {
  const { data, loading } = useRequest<{
    data: any[];
  }>({
    resource: 'availableActions',
    action: 'list',
  });
  if (loading) {
    return <Spin />;
  }
  return <AvailableActionsContext.Provider value={data?.data}>{props.children}</AvailableActionsContext.Provider>;
};

export const useAvailableActions = () => {
  return useContext(AvailableActionsContext);
};

export const RoleTable = () => {
  return (
    <div>
      <SchemaComponentContext.Provider value={{ designable: false }}>
        <AvailableActionsProver>
          <SchemaComponent
            schema={roleSchema}
            components={{ MenuItemsProvider, SettingCenterPermissionProvider, PermissionProvider }}
          />
        </AvailableActionsProver>
      </SchemaComponentContext.Provider>
    </div>
  );
};
