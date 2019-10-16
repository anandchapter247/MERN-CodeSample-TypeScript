import { Method } from 'axios';

export interface IApiRoutesValues {
  service: string;
  url: string;
  method: Method;
  authenticate: boolean;
}

export interface IApiRoutes {
  ADMIN_LOGIN: IApiRoutesValues;
  ADMIN_PROFILE: IApiRoutesValues;
  ADMIN_PROFILE_UPDATE: IApiRoutesValues;
  ADMIN_CHANGE_PASSWORD: IApiRoutesValues;
  ADMIN_PROXY_LOGIN: IApiRoutesValues;
  GET_ORGANIZATION: IApiRoutesValues;
  ADD_ORGANIZATION: IApiRoutesValues;
  ADD_TEMPLATE: IApiRoutesValues;
  UPDATE_TEMPLATE: IApiRoutesValues;
  GET_TEMPLATE: IApiRoutesValues;
  VIEW_TEMPLATE: IApiRoutesValues;

  EXPORT_REPORT: IApiRoutesValues;

    /**
   * CMS Page
   */

  ADD_HOME_PAGE: IApiRoutesValues;
  VIEW_HOME_PAGE: IApiRoutesValues;
  UPDATE_HOME_PAGE: IApiRoutesValues;
}
