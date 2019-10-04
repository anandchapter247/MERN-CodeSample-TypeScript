import { RouteComponentProps } from 'react-router';
import { LoginRequest } from '../actions';

export interface ILoginModal {
  email: string;
  password: string;
}

export interface ILoginProps extends RouteComponentProps {
  onLogin: (data: ILoginModal) => void;
}

export interface ILoginErrors {
  email: string;
  password: string;
}

export interface ILoginState {
  email: string;
  password: string;
  errors: ILoginErrors;
}
