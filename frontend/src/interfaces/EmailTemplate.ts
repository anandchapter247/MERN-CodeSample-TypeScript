export interface ITemplateState{
    name:string,
    subject:string,
    content:any;
}

export interface ITemplateModal{
    isLoading:boolean;
    isError:boolean;
    templateData:any;
}