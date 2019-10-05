import { RouteComponentProps } from 'react-router';

export interface IProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  _id?: string;
}

export interface IProfileModal {
  isLoading: boolean;
  profileInfo: IProfileInfo;
  isError: boolean;
}

export interface IProfileState {
  firstName: string;
  lastName: string;
  email: string;
  errors: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface IProfileProps extends RouteComponentProps {
  profileInfoReducer?: IProfileModal;
  updateProfile: (data: IProfileInfo) => void;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IChangePasswordModal {
  isLoading: boolean;
  isError: boolean;
}
export interface IChangePasswordState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  errors: IChangePassword;
}
export interface IChangePasswordProps extends RouteComponentProps {
  changePassword: (data: IChangePassword) => void;
  changePasswordReducer?: IChangePasswordModal;
}
