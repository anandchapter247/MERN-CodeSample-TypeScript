import { createAction } from 'redux-actions';

export * from './Login';
export * from './ProfileInfo';
export * from './ChangePassword';
export * from './Organization';
export * from './EmailTemplate';
export * from './Report';

//
export const redirectTo = createAction('REDIRET_TO');
//
export const showLoader = createAction('SHOW_LOADER');
export const hideLoader = createAction('HIDE_LOADER');
