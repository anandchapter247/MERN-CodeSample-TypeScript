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

export { encryptPassword, comparePassword, generateSalt, JWTSecrete };
