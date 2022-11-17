import { NextFunction, Request, Response } from "express";

const error = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  err.message = err.message.replace(/^./, err.message[0].toUpperCase());

  res.statusCode = err.statusCode;

  res.json({
    status: false,
    message: err.message,
    payload: null,
  });
};

export default error;
