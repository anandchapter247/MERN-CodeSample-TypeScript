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

export interface IOrganizationProps {
  organizationReducer?: IOrganizationModel;
  getOrganization: () => void;
}
