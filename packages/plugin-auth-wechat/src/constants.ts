// @ts-ignore
import { name } from '../package.json';

export const authType = 'WeChat';
export const namespace = name;
export const weChatApiOauthBaseUrl = 'https://api.weixin.qq.com/sns/oauth2/';
export const weChatApiOauthScope = 'snsapi_login';


// timeout 15min
export const AUTH_TIMEOUT_SECOND = '15m';
