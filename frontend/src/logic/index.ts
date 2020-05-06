import { Logic, createLogic } from 'redux-logic';
import { push } from 'react-router-redux';
import { LoginLogics } from './Login';
import { ProfileInfoLogics } from './ProfileInfo';
import { ChangePasswordLogics } from './ChangePassword';
import { userLogics } from './User';
import { TemplateLogics } from './EmailTemplate';
import { FaqLogics } from "./Faq";

export const redirectToLogic = createLogic({
  type: 'REDIRET_TO',
  async process(data, dispatch: any, done) {
    const action: any = data.action;
    dispatch(push(action.payload.path));
    done();
  },
});

export const AllLogics: Logic[] = [
  ...LoginLogics,
  ...ProfileInfoLogics,
  ...ChangePasswordLogics,
  ...userLogics,
  ...FaqLogics,
  ...TemplateLogics,
  redirectToLogic,
];
