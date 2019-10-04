import { createLogic } from 'redux-logic';
import { LoginActionTypes } from '../actions';
import { ApiRoutes } from '../config';
import { ApiHelper } from '../Helper/ApiHelper';
/**
 *
 */
const loginLogic = createLogic({
  type: LoginActionTypes.LOGIN_REQUEST,
  async process({ action }, dispatch, done) {
    console.log('dffffffffffffffffffffff');

    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.USER_LOGIN.service,
      ApiRoutes.USER_LOGIN.url,
      ApiRoutes.USER_LOGIN.method,
      ApiRoutes.USER_LOGIN.authenticate,
      undefined,
      action,
    );
    console.log(response);
    if (response && response.isError) {
      console.log('dfdsfdfds');
      done();
    } else {
      console.log(response);
      done();
    }
  },
});

export const LoginLogics = [loginLogic];
