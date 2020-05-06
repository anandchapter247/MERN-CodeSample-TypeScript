import { IProxyLoginActionData } from "./Login";
import { RouteComponentProps } from "react-router";

export interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  _id?: string;
  createdAt?:any;
}

export interface IUserModel {
  isLoading: boolean;
  userData: IUserData[];
  userInfo: IUserData;
  isError: boolean;
}

export interface IUserState {
  totalRecords: number;
  currentPage: number;
  pageLimit: number;
  pageNeighbours: number;
  selectedUser:any;
}

export interface IUserProps extends RouteComponentProps{
  userReducer?: IUserModel;
  getUsers: () => void;
  updateUserStatus: (data:any) => void;
}

export interface IAddUserState{
  firstName:string;
  lastName:string;
  email:string;
  isEditable: boolean,
  id: string,
  errors: {
    firstName: string,
    lastName: string,
    email: string,
  },
}

export interface IAddUserProps extends RouteComponentProps<{
  id:string
}>{
  userReducer:IUserModel;
  addUser:(data:any)=>void;
  updateUser:(data:any)=>void;
  viewUser:(data:any)=>void;
}