import { IRootState } from './../interfaces';
import { Reducer, AnyAction, combineReducers } from 'redux';
import { loginReducer } from './Login';
import { handleActions } from 'redux-actions';
import { profileInfoReducer } from './ProfileInfo';
import { changePasswordReducer } from './ChangePassword';
import { userReducer } from './User';
import { templateReducer } from './EmailTemplate';
import { proxyLoginReducer } from './ProxyLogin';
import { homePageReducer } from './CMS';
import { faqReducer } from "./Faq";

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
  userReducer: userReducer as any,
  TemplateReducer: templateReducer as any,
  ProxyLoginReducer: proxyLoginReducer as any,
  homePageReducer: homePageReducer as any,
  faqReducer:faqReducer as any,
});
