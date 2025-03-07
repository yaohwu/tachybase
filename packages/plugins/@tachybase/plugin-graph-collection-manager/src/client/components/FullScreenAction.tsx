import React, { forwardRef } from 'react';

import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Button, Tooltip } from 'antd';

import { getPopupContainer, useGCMTranslation } from '../utils';

export const FullscreenAction = forwardRef(() => {
  const { t } = useGCMTranslation();

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.getElementById('graph_container'));
  return (
    <Tooltip title={t('Full Screen')} getPopupContainer={getPopupContainer}>
      <Button
        onClick={() => {
          toggleFullscreen();
        }}
      >
        {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </Button>
    </Tooltip>
  );
});
FullscreenAction.displayName = 'FullscreenAction';
