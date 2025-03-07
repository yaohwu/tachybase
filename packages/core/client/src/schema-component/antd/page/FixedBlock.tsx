import React, { useContext, useEffect, useRef, useState } from 'react';
import { useField, useFieldSchema } from '@tachybase/schema';

import { createStyles } from 'antd-style';

const FixedBlockContext = React.createContext<{
  setFixedBlock: (value: string | false) => void;
  height: number | string;
  fixedBlockUID: boolean | string;
  fixedBlockUIDRef: React.MutableRefObject<boolean | string>;
  inFixedBlock: boolean;
}>({
  setFixedBlock: () => {},
  height: 0,
  fixedBlockUID: false,
  fixedBlockUIDRef: { current: false },
  inFixedBlock: false,
});

export const useFixedSchema = () => {
  const field = useField();
  const fieldSchema = useFieldSchema();
  const { setFixedBlock, fixedBlockUID, fixedBlockUIDRef } = useFixedBlock();
  const hasSet = useRef(false);

  useEffect(() => {
    if (!fixedBlockUIDRef.current || hasSet.current) {
      setFixedBlock(field?.decoratorProps?.fixedBlock ? fieldSchema['x-uid'] : false);
      hasSet.current = true;
    }
  }, [field?.decoratorProps?.fixedBlock]);

  return fieldSchema['x-uid'] === fixedBlockUID;
};

export const useFixedBlock = () => {
  return useContext(FixedBlockContext);
};

export const FixedBlockWrapper = (props) => {
  const fixedBlock = useFixedSchema();
  const { height, fixedBlockUID } = useFixedBlock();
  /**
   * The fixedBlockUID of false means that the page has no fixed blocks
   * isPopup means that the FixedBlock is in the popup mode
   */
  if (!fixedBlock && fixedBlockUID) return <>{props.children}</>;
  return (
    <div
      className="tb-fixed-block"
      style={{
        height: fixedBlockUID ? `calc(100vh - ${height})` : undefined,
      }}
    >
      {props.children}
    </div>
  );
};

interface FixedBlockProps {
  height: number | string;
  children: React.ReactNode;
}

const useStyles = createStyles(({ css }) => {
  return {
    fixedBlockCss: css`
      overflow: hidden;
      position: relative;
      .tb-card-item {
        height: 100%;
        .ant-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          .ant-card-body {
            height: 1px;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
        }
      }
    `,
  };
});

const FixedBlock = (props: FixedBlockProps) => {
  const { height } = props;
  const { styles } = useStyles();
  const [fixedBlockUID, _setFixedBlock] = useState<false | string>(false);
  const fixedBlockUIDRef = useRef(fixedBlockUID);
  const setFixedBlock = (v) => {
    fixedBlockUIDRef.current = v;
    _setFixedBlock(v);
  };
  return (
    <FixedBlockContext.Provider value={{ inFixedBlock: true, height, setFixedBlock, fixedBlockUID, fixedBlockUIDRef }}>
      <div
        className={fixedBlockUID ? styles.fixedBlockCss : ''}
        style={{
          height: fixedBlockUID ? `calc(100vh - ${height})` : undefined,
        }}
      >
        {props.children}
      </div>
    </FixedBlockContext.Provider>
  );
};

export default FixedBlock;
