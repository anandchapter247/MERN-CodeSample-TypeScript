import { IUserModel } from "../interfaces";

export const UserInitialState: IUserModel = {
  isLoading: true,
  userData: [],
  userInfo:{
    firstName:'',
    lastName:"",
    email:'',
    isActive:false
  },
  isError: false,
};
