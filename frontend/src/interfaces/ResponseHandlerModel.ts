export interface IResponseHandlerModel {
  code: Number;
  isError: boolean;
  timestamp: any;
  error?: string;
  messages: Array<string>;
  data?: any;
}
