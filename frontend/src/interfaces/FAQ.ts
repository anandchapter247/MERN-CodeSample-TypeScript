export interface IAddFAQState{
    question:string;
    answer:any;
    order:number;
    errors:{
        question:string;
        answer:string;
        order:string;
    }
}

export interface IFaqModel {
    isLoading: boolean;
    faqData: any;
    faqInfo: any;
    isError: boolean;
}

export interface IFaqState {
    totalRecords: number;
    currentPage: number;
    pageLimit: number;
    pageNeighbours: number;
  }