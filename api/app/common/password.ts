import bcrypt from "bcrypt";
import crypto, { Cipher, Decipher } from "crypto";

/**
 * Generate Password
 */
const generatePassword = (length = 8) => {
  var text = '';
  var possible =
    'abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

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
 * Encrypt Email and Id
 */
var algorithm = "aes-256-cbc";
var password = "password";
const encrypt = (text: any): Promise<any> => {
  const cipher: Cipher = crypto.createCipher(algorithm, password);
  var crypted: any = cipher.update(text.toString(), "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};
/**
|--------------------------------------------------
| Dycript Email and Id
|--------------------------------------------------
*/
const decrypt = (text: any): Promise<any>   => {
  const decipher: Decipher = crypto.createDecipher(algorithm, password);
  var dec: any = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
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

export { generatePassword, encryptPassword, comparePassword, generateSalt, encrypt, decrypt, JWTSecrete, getIpAddress };
