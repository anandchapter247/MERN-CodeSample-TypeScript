import { IProfileModal } from '../interfaces';

export const ProfileInitialState: IProfileModal = {
  isLoading: true,
  profileInfo: {
    firstName: '',
    lastName: '',
    email: '',
    _id: '',
  },
  isError: false,
};
