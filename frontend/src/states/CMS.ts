import { IHomePageModel } from '../interfaces';

export const HomePageInitialState: IHomePageModel = {
  isLoading: true,
  homePageData: [],
  homePageInfo: {
    mainSection: {},
    howItWorks: {},
    ourStory: {},
    why: {}
  },
  totalRecords: 0,
  isError: false,
};
