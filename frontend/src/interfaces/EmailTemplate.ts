export interface ITemplateState {
  name: string;
  subject: string;
  content: any;
  isEditable: boolean;
}

export interface ITemplateModal {
  isLoading: boolean;
  isError: boolean;
  templateData: any[];
  templateInfo: any;
}
