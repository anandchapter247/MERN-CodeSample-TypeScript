import { RouteComponentProps } from 'react-router';

export interface ITemplateState {
  name: string;
  type?: {
    label: string;
    value: string;
  };
  subject: string;
  content: any;
  errors: {
    name: string;
    subject: string;
    content: string;
    type: string;
  };
  isEditable: boolean;
  id: string;
}

export interface ITemplateProps
  extends RouteComponentProps<{
    id: string;
  }> {
  templateReducer: ITemplateModal;
  addTemplate: (data: any) => void;
  updateTemplate: (data: any) => void;
  viewTemplate: (data: any) => void;
}

export interface ITemplateModal {
  isLoading: boolean;
  isError: boolean;
  templateData: any[];
  templateInfo: any;
}
