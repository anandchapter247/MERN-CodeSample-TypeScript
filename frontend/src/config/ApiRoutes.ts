import { IApiRoutes } from '../interfaces';

export const ApiRoutes: IApiRoutes = {
  USER_LOGIN: {
    service: '/auth',
    url: '/login',
    method: 'POST',
    authenticate: false,
  },
};
