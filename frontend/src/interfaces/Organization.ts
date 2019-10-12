import { IProxyLoginActionData } from "./Login";
import { RouteComponentProps } from "react-router";

export interface IOrganizationData {
  organizationName: string;
  wildCardDomain: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  courseId: string;
  isActive: boolean;
  _id?: string;
}

export interface IOrganizationModel {
  isLoading: boolean;
  organizationData: IOrganizationData[];
  isError: boolean;
}

export interface IOrganizationState {
  totalRecords: number;
  currentPage: number;
  pageLimit: number;
  pageNeighbours: number;
}

export interface IOrganizationProps extends RouteComponentProps{
  organizationReducer?: IOrganizationModel;
  getOrganization: () => void;
  proxyLogin: (payload: IProxyLoginActionData) => void;
}
