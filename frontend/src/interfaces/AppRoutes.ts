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
  ORGANIZATION: string;
  EMAILTEMPLATE:string;
}
