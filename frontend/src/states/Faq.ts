import { IFaqModel } from "../interfaces";

export const FaqInitialState: IFaqModel = {
  isLoading: true,
  faqData: [],
  faqInfo:{
    question:'',
    answer:"",
    order:'',
  },
  isError: false,
};
