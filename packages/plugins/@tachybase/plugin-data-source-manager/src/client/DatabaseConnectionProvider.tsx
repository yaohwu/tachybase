import React, { createContext, FC, useState } from 'react';
import { SchemaComponentOptions } from '@tachybase/client';

import * as hooks from './hooks';

export const DataSourceContext = createContext(null);
DataSourceContext.displayName = 'DataSourceContext';

export const DatabaseConnectionProvider: FC = (props) => {
  const [dataSource, setDataSource] = useState(null);
  return (
    <DataSourceContext.Provider value={{ dataSource, setDataSource }}>
      <SchemaComponentOptions scope={hooks} components={{}}>
        {props.children}
      </SchemaComponentOptions>
    </DataSourceContext.Provider>
  );
};
