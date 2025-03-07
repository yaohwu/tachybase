import React from 'react';

import { Button, Result, Typography } from 'antd';
import { FallbackProps, useErrorBoundary } from 'react-error-boundary';
import { Trans, useTranslation } from 'react-i18next';

const { Paragraph, Text, Link } = Typography;

export const ErrorFallback = ({ error }: FallbackProps) => {
  const { resetBoundary } = useErrorBoundary();
  const { t } = useTranslation();

  const subTitle = (
    <Trans>
      {'This is likely a TachyCode internals bug. Please open an issue at '}
      <Link href="https://git.daoyoucloud.com/daoyoucloud/tachycode/issues" target="_blank">
        here
      </Link>
    </Trans>
  );

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Result
        style={{ maxWidth: '60vw', margin: 'auto' }}
        status="error"
        title={t('Render Failed')}
        subTitle={subTitle}
        extra={[
          <Button
            type="primary"
            key="feedback"
            href="https://git.daoyoucloud.com/daoyoucloud/tachycode/issues"
            target="_blank"
          >
            {t('Feedback')}
          </Button>,
          <Button key="try" onClick={resetBoundary}>
            {t('Try again')}
          </Button>,
        ]}
      >
        <Paragraph copyable>
          <Text type="danger" style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
            {error.stack}
          </Text>
        </Paragraph>
      </Result>
    </div>
  );
};
