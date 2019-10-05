import bcrypt from "bcrypt";
import crypto, { Hash } from "crypto";
/**
 * Encrypt the password using bcrypt algo
 */
const encryptPassword = (password: string, salt: string): string => {
  return bcrypt.hashSync(password, salt);
};

/**
 * Compare the password using bcrypt algo
 */
const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
/**
 * Generates Salt for the password
 */
const generateSalt = (length = 10): string => {
  return bcrypt.genSaltSync(length);
};

/**
 *
 */
const JWTSecrete: string = "qwertyuiop[]lkjhgfdazxcvbnm,./!@#$%^&*()";

/* Function to get client IP */
const getIpAddress = (req: Request | any )=> {
  var ip: string| null = null;
  try {
    ip =
      (req.headers["x-forwarded-for"] || "").split(",").pop() ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  } catch (ex) {
    console.log(ex);
    ip = null;
  }
  return ip;
};

export { encryptPassword, comparePassword, generateSalt, JWTSecrete, getIpAddress };
