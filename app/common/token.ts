import { UserModel } from "./../models";
import Mongoose from "mongoose";
import { IUserTokenData } from "./../interfaces";
import { sign as JWTSign, verify as VerifyJWT } from "jsonwebtoken";
import { JWTSecrete } from "./password";
import { Request, NextFunction, Response } from "express";

/**
 *
 */
export const GenerateToken = async (data: IUserTokenData): Promise<string> => {
  return new Promise((resolve, reject) => {
    JWTSign(
      data,
      JWTSecrete,
      {
        expiresIn: 86400
      },
      (err: any, token: string) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

/**
 *
 */

export const ValidateAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token: string = req.headers["authorization"]
    ? req.headers["authorization"].toString()
    : "";
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, Please provide authentication token!"
    });
  }
  try {
    const tokenData: IUserTokenData = VerifyJWT(
      token,
      JWTSecrete
    ) as IUserTokenData;
    const currentUser: Document | null | any = await UserModel.findOne({
      isDeleted: false,
      _id: Mongoose.Types.ObjectId(tokenData.id)
    });
    req.currentUser = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token has expired"
    });
  }
};
