import { IResponseHandlerModel } from '../interfaces/ResponseHandlerModel';
import { AxiosResponse } from 'axios';

/**
 * ErrorHandlerHelper Class - For managing errors
 */
export class SuccessHandlerHelper {
  private rawData: any;
  public data: IResponseHandlerModel = {
    code: 200,
    isError: false,
    timestamp: Date.now(),
    error: undefined,
    messages: [],
  };

  constructor(data: AxiosResponse<any>) {
    this.rawData = data;
    this.setSucccess();
  }

  private setSucccess = () => {
    const messages: any = [];

    for (let i in this.rawData) {
      if (typeof this.rawData[i] === 'string') {
        messages.push(this.rawData[i]);
      }
    }
    this.data.data = this.rawData;
    this.data.messages = messages;
  };
}
