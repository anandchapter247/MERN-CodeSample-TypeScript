import { IResponseHandlerModel } from "../interfaces/ResponseHandlerModel";
import { AxiosResponse } from "axios";

/**
 * ErrorHandlerHelper Class - For managing errors
 */
export class ErrorHandlerHelper {
  private rawError: any;
  public error: IResponseHandlerModel = {
    code: 500,
    isError: true,
    timestamp: Date.now(),
    error: "Unknown error",
    messages: [],
    data: undefined
  };
  constructor(err: AxiosResponse<any>) {
    this.rawError = err;
    this.setError();
  }

  private setError = () => {
    this.error.code = this.rawError ? this.rawError.code : this.error.code;
    this.error.timestamp = Date.now();
    this.error.messages = [];
    console.log(this.rawError);
    console.log("this.rawError");
    if (
      this.rawError &&
      this.rawError.data &&
      typeof this.rawError.data === "object"
    ) {
      this.error.messages.push(this.rawError.data.message);
      this.error.data = this.rawError.data.data;
    } else {
      this.error.error = "Unknown";
      this.error.messages = ["An unexpected error occured."];
    }
  };
}
