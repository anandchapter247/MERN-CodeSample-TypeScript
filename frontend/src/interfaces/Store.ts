import { ILoginModal } from './Login';
import { IChangePasswordModal, IProfileModal } from './Profile';
import { IOrganizationModel } from './Organization';

export interface ImainState {
  showLoader: boolean;
}

export interface IRootState {
  loginReducer: ILoginModal;
  profileInfoReducer: IProfileModal;
  mainReducer: ImainState;
  changePasswordReducer: IChangePasswordModal;
  OrganizationReducer: IOrganizationModel;
}
