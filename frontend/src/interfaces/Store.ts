import { ILoginModal } from './Login';
import { IChangePasswordModal, IProfileModal } from './Profile';
import { IOrganizationModel } from './Organization';
import { ITemplateModal } from './EmailTemplate';

export interface ImainState {
  showLoader: boolean;
}

export interface IRootState {
  loginReducer: ILoginModal;
  profileInfoReducer: IProfileModal;
  mainReducer: ImainState;
  changePasswordReducer: IChangePasswordModal;
  OrganizationReducer: IOrganizationModel;
  TemplateReducer:ITemplateModal;
  ProxyLoginReducer:ILoginModal;
}
