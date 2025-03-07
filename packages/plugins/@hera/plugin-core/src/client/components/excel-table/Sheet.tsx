import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { ClassNamesArg, css, cx } from '@tachybase/client';

import Spreadsheet from '../x-sheet';

export type SheetRef = {
  getData: () => any;
};

export type SheetProps = {
  data?: any;
  className?: ClassNamesArg;
};

const ExcelSheet = forwardRef<SheetRef, SheetProps>(({ data, className }, ref) => {
  const workbookRef = useRef<Spreadsheet>(null);
  const containerRef = useRef(null);

  const getData = () => {
    if (!workbookRef.current) {
      throw new Error('Workbook is not initialized');
    }
    return workbookRef.current.getData();
  };

  useImperativeHandle(ref, () => ({
    getData,
  }));

  useEffect(() => {
    if (containerRef.current) {
      const workbook = new Spreadsheet(containerRef.current, {
        view: {
          height: () => containerRef.current?.offsetHeight,
          width: () => containerRef.current?.offsetWidth,
        },
      });

      workbook.loadData(data);
      workbookRef.current = workbook;
      return () => {
        workbook.dispose();
      };
    }
  }, [data]);

  return (
    <div
      ref={containerRef}
      id="sheet988"
      className={cx(
        css`
          width: 100%;
          height: 100%;
        `,
        className,
      )}
    />
  );
});

ExcelSheet.displayName = 'ExcelSheet';

export default ExcelSheet;
