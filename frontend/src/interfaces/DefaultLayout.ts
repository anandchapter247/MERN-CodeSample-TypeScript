import { RouteComponentProps } from 'react-router';
import { IProfileInfo, IProfileModal } from './Profile';

export interface IredirectPath {
  path: string;
}

export interface IDefaultLayoutProps extends RouteComponentProps {
  redirectTo: (data: IredirectPath) => void;
  profileInfo: () => void;
  profileInfoReducer?: IProfileModal;
}

export interface IDefaultLayoutState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userDetails: {};
}

export interface IDefaultHeaderProps extends RouteComponentProps {
  profileInfoReducer?: {
    isLoading: boolean;
    profileInfo: IProfileInfo;
  };
  onLogout: () => void;
}

export interface IDefaultHeaderState {}
