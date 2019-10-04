import { IResponseHandlerModel } from './../interfaces/ResponseHandlerModel';
import { AxiosResponse } from 'axios';

/**
 * ErrorHandlerHelper Class - For managing errors
 */
export class ErrorHandlerHelper {
  private rawError: any;
  public error: IResponseHandlerModel = {
    code: 500,
    isError: true,
    timestamp: Date.now(),
    error: 'Unknown error',
    messages: [],
    data: undefined,
  };
  constructor(err: AxiosResponse<any>) {
    this.rawError = err;
    this.setError();
  }

  private setError = () => {
    this.error.code = this.rawError.code ? this.rawError.code : this.error.code;
    this.error.timestamp = Date.now();
    this.error.messages = [];
    if (this.rawError.response && typeof this.rawError.response === 'object') {
      for (const i in this.rawError.response) {
        if (this.rawError.response.hasOwnProperty(i)) {
          let element: any = this.rawError.response[i];
          this.error.error = i;

          if (typeof element === 'object' && element[0]) {
            element = element.join('.\n');
          } else if (typeof element === 'string') {
          } else {
            element = 'Unknown error !';
          }
          this.error.messages.push(element);
        }
      }
    } else {
      this.error.error = 'Unknown';
      this.error.messages = ['An unexpected error occured.'];
    }
  };
}
