import { genStyleHook } from '../../../schema-component/antd/__builtins__';

export const useSchemaInitializerStyles = genStyleHook('tb-schema-initializer', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '.ant-menu': {
        background: 'transparent',
        borderInlineEnd: 'none !important',
      },
      ':not(.ant-menu)': {
        [`${componentCls}-group-title`]: {
          color: token.colorTextDescription,
          lineHeight: `${token.controlHeight}px`,
          paddingLeft: token.padding,
          paddingRight: token.paddingSM,
        },
        [`${componentCls}-menu-item`]: {
          marginInline: token.marginXXS,
          paddingLeft: token.padding,
          paddingRight: token.paddingSM,
          lineHeight: `${token.controlHeight}px`,
          color: token.colorText,
          cursor: 'pointer',

          '&:hover': {
            borderRadius: token.borderRadiusSM,
            backgroundColor: token.colorBgTextHover,
          },
        },
      },
    },
    [`${componentCls}-menu-sub`]: {
      ul: {
        maxHeight: '50vh !important',
      },
    },
    [`${componentCls}-item-content`]: {
      marginLeft: token.marginXS,
    },
  };
});
