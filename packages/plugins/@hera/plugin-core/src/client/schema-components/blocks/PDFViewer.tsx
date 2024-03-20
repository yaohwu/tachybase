import React, { useEffect, useRef, useState } from 'react';
import { PDFViewer } from '../../components/PDFViewer';
import { Space } from 'antd';
import { css } from '@nocobase/client';
import { usePDFViewerRef } from '../../schema-initializer/blocks/PDFVIewerBlockInitializer';

export const InternalPDFViewer = (props) => {
  const { usePdfPath: useMaybePdfPath } = props;
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [, setHeight] = useState(0);
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
      setHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef]);
  const ref = usePDFViewerRef();
  const usePdfPath = useMaybePdfPath ?? (() => '');
  const pdfPath = usePdfPath();
  return (
    <div>
      <div
        className={css`
          display: flex;
        `}
      >
        <div
          className={css`
            flex: 1;
          `}
        ></div>
        <Space></Space>
      </div>
      <div
        ref={containerRef}
        className={css`
          border: 1px dashed black;
          margin-top: 12px;
          overflow: hidden;
          display: flex;
          justify-content: center;
        `}
      >
        {pdfPath ? <PDFViewer file={pdfPath} width={width} ref={ref} /> : ''}
      </div>
    </div>
  );
};
