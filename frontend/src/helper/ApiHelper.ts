import Axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { API_ENDPOINT } from "../config/AppConfig";
import { ErrorHandlerHelper } from "./ErrorHandlerHelper";
import { SuccessHandlerHelper } from "./SuccessHandlerHelper";

/**
 * ApiHelper Class - For making Api Requests
 */
export class ApiHelper {
  _portalGateway: string;
  _apiVersion: string;

  constructor() {
    this._portalGateway = API_ENDPOINT;
    this._apiVersion = "";
  }
  setHost = (host: string) => {
    this._portalGateway = host;
  };
  setApiVersion = (version: string) => {
    this._apiVersion = version;
  };
  /**
   * Fetches from the Gateway defined by the instantiated object. Accepts <T> as output object.
   * @example <caption>"/Auth/UserAccount", "/GetCurrentUser", "GET", "JWT Content"</caption>
   * @param {service} service - wanting to be access ex. "UserAuth/Auth"
   * @param {endpoint} endpoint - you wish to call ex. "/Login"
   * @param {method} mehotd - method (GET, UPDATE, DELETE, POST)
   * @param {jwt} JWT - JSON Web Token (Optional)
   * @param {queryOptions} Query - query options for "GET" methods (Optional)
   * @param {body} body - JSON body for "UPDATE, DELETE and POST" methods (Optional)
   */
  async FetchFromServer(
    service: string,
    endpoint: string,
    method: Method,
    authenticated: boolean = false,
    queryOptions?: string,
    body?: any,
    responseType?: any
  ) {
    let options: AxiosRequestConfig = { method: method };
    let url: string = this._apiVersion + service + endpoint;
    options.headers = { "Content-Type": "application/json" };
    if (responseType === "blob") {
      options.responseType = "blob";
    }
    if (authenticated) {
      const storageSession = localStorage.getItem("token");
      options.headers.Authorization = storageSession;
    }
    // html query for "GET", json body for others.
    if (queryOptions && typeof queryOptions === "object") {
      let queryParams = [] as string[];
      Object.keys(queryOptions).map(key => {
        queryParams.push(`${key}=${(queryOptions as any)[key]}`);
        return key;
      });
      url += `?${queryParams.join("&")}`;
    }

    if (body) {
      options.data = body;
    }
    try {
      let response: AxiosResponse<any> = await Axios({
        ...options,
        url: `${this._portalGateway}${url}`
      });

      if (response.status < 200 || response.status >= 300) {
        let errorObject: any = {
          code: response.status,
          response: response.data
        };

        throw errorObject;
      }
      const data: SuccessHandlerHelper = new SuccessHandlerHelper(
        response.data
      );
      return data.data;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log("%s Req Cancelled", err);
      }
      const errorHelper: ErrorHandlerHelper = new ErrorHandlerHelper(
        err.response
      );
      return errorHelper.error;
    }
  }

  // Function to upload file in form data
  UploadImage = async (
    service: string,
    endpoint: string,
    body: any,
    jsonData: string[] = []
  ) => {
    let fd = new FormData();

    for (const k in body) {
      if (body.hasOwnProperty(k)) {
        const element = body[k];
        if (
          k === "characteristic" ||
          k === "audio" ||
          k === "video" ||
          k === "removedAttachments" ||
          k === "courseId" ||
          k === "moduleId" ||
          k === "organizationId" ||
          k === "text" ||
          jsonData.indexOf(k) > -1
        ) {
          fd.append(k, JSON.stringify(element));
        } else {
          fd.append(k, element);
        }
      }
    }
    let url: string = this._apiVersion + service + endpoint;
    let options: AxiosRequestConfig = { method: "POST" };
    options.headers = {};
    const storageSession = localStorage.getItem("token");
    options.headers.Authorization = storageSession;

    try {
      let response: AxiosResponse<any> = await Axios.post(
        `${this._portalGateway}${url}`,
        fd,
        {
          headers: options.headers
        }
      );

      if (response.status < 200 || response.status >= 300) {
        let errorObject: any = {
          code: response.status,
          response: response.data
        };

        throw errorObject;
      }
      const data: SuccessHandlerHelper = new SuccessHandlerHelper(
        response.data
      );
      return data.data;
    } catch (err) {
      if (Axios.isCancel(err)) {
      }
      const errorHelper: ErrorHandlerHelper = new ErrorHandlerHelper(
        err.response
      );
      return errorHelper.error;
    }
  };
}
