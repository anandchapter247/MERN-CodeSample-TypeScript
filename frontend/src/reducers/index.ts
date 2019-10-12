import { IRootState } from './../interfaces';
import { Reducer, AnyAction, combineReducers } from 'redux';
import { loginReducer } from './Login';
import { handleActions } from 'redux-actions';
import { profileInfoReducer } from './ProfileInfo';
import { changePasswordReducer } from './ChangePassword';
import { organizationReducer } from './Organization';
import { templateReducer } from './EmailTemplate';
import { proxyLoginReducer } from './ProxyLogin';

export const mainReducer = handleActions(
  {
    SHOW_LOADER: () => ({
      showLoader: true,
    }),
    HIDE_LOADER: () => ({
      showLoader: false,
    }),
  },
  {
    showLoader: false,
  },
);

export const RootReducer: Reducer<IRootState, AnyAction> = combineReducers<
  IRootState
>({
  mainReducer: mainReducer as any,
  loginReducer: loginReducer as any,
  profileInfoReducer: profileInfoReducer as any,
  changePasswordReducer: changePasswordReducer as any,
  OrganizationReducer: organizationReducer as any,
  TemplateReducer: templateReducer as any,
  ProxyLoginReducer: proxyLoginReducer as any,
});
