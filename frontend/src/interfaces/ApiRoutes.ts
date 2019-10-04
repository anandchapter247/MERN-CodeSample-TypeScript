import { Method } from 'axios';

export interface IApiRoutesValues {
  service: string;
  url: string;
  method: Method;
  authenticate: boolean;
}

export interface IApiRoutes {
  USER_LOGIN: IApiRoutesValues;
}
