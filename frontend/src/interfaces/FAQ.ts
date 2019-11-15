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