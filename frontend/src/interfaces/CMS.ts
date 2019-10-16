import { RouteComponentProps } from 'react-router';
import { IredirectPath } from './DefaultLayout';

export interface IHomePageData {
  mainSection: any;
  howItWorks: any;
  ourStory: any;
  why: any;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

export interface IHomePageModel {
  isLoading: boolean;
  homePageData: IHomePageData[];
  homePageInfo: IHomePageData;
  totalRecords: number;
  isError: boolean;
}

export interface IHomePageProps extends RouteComponentProps {
  homePageReducer?: IHomePageModel;
  redirectTo?: (path: IredirectPath) => void;
}

export interface IAddHomePageState {
  id: string;
  mainSection: {
    image: any,
    imageUrl: any;
    title: any,
    content: any,
    buttonText: any
  };
  howItWorks: {
    title: string,
    section: Array<{ heading: string, image: string, title: string, content: any }>,
    buttonText: string,
  },
  ourStory: {
    heading: string,
    title: string,
    content: any,
    videoLink: string
  },
  why: {
    heading: string,
    section: Array<{
      title: string, image: any,
      imageUrl: any; content: Array<{ text: string }>
    }>
  }
  errors: {
    mainSectionTitle: string;
    mainSectionContent: string;
    mainSectionButtonText: string;
    mainSectionImageUrl: string;
    ourStoryTitle: string;
    ourStoryContent: string;
    ourStoryVideoLink: string
  };
  isEditable: boolean;
  searchValue: string;
}

export interface IAddHomePageProps extends RouteComponentProps<{ id: string; }> {
  homePageReducer?: IHomePageModel;
  addHomePage: (data: IHomePageData) => void;
  viewHomePage: () => void;
  updateHomePage: (data: IHomePageData) => void;
}
