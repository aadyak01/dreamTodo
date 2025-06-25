import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../infra/errors/AppError";

type PayLoad = {
  sub: string
}


export default async function newPasswordUser(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization


 if (!authHeader || !authHeader.startsWith("Bearer ")) {
   throw new AppError("Token is invalid or missing.", 401);
 }


  const [, token] = authHeader.split(" ")

 try {
   const decoded = verify(
     token,
     String(process.env.NEW_PASS_SECRET)
   ) as PayLoad;

   request.user = {
     id: decoded.sub
   };

   next();
 } catch (error) {
   throw new AppError("Token is invalid", 401);
 }
}
