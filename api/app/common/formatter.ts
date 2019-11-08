import { ValidationError } from "express-validator";

/**
 *
 */
export const ValidationFormatter = (
  err: Record<string, ValidationError>
): Object => {
  let errorObject: any = {};
  for (const key in err) {
    if (err.hasOwnProperty(key)) {
      const e = err[key];
      errorObject[e.param] = e.msg;
    }
  }
  return errorObject;
};
