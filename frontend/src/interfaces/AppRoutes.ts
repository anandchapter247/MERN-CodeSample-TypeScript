import { ImainState } from './Store';
import { RouteProps } from 'react-router';
import { IredirectPath } from './DefaultLayout';

export interface IAppRoutesProps extends RouteProps {
  mainState?: ImainState;
  redirectTo?: (path: IredirectPath) => void;
}
export interface IAppRoutesState {}

export interface IAppRoutes {
  MAIN: string;
  LOGIN: string;
  HOME: string;
  MY_PROFILE: string;
  USER: string;
  ADD_USER: string;
  EDIT_USER: string;
  EMAILTEMPLATE: string;
  ADD_TEMPLATE: string;
  EDIT_TEMPLATE: string;
  ADD_HOME_PAGE: string;
  FAQ:string;
  ADD_FAQ:string;
}
