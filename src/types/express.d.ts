/* eslint-disable no-unused-vars */
import "express";
import { IUser } from "../interfaces/models/IUser";

declare global {
  namespace Express {
    export interface Request {
      userId?: IUser["id"];
    }
  }
}
