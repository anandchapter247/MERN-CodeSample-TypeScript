import { createAction } from 'redux-actions';

export * from './Login';
export * from './ProfileInfo';
export * from './ChangePassword';
export * from './User';
export * from './EmailTemplate';
export * from './Report';
export * from './ProxyLogin';
export * from './CMS';
export * from './Faq';

//
export const redirectTo = createAction('REDIRET_TO');
//
export const showLoader = createAction('SHOW_LOADER');
export const hideLoader = createAction('HIDE_LOADER');
