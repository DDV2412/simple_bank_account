import JWTUtil from "../utils/JwtEncoder";
import { NextFunction, Response, Request } from "express";
import ResponseData from "../utils/ResponseData";

const getToken = (token: string) => {
  let header = token.split(" ");

  if (header.length > 1) {
    return header[1];
  }

  return header[0];
};

const authentication = (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.headers["authorization"] != "string") {
    const responseData: ResponseData = new ResponseData(
      false,
      "UNAUTHORIZED",
      null
    );

    return res.status(401).json(responseData);
  }

  let token = getToken(req.headers["authorization"]);

  let payload = null;

  try {
    payload = JWTUtil.decode(token);
  } catch (error) {
    const responseData: ResponseData = new ResponseData(
      false,
      "UNAUTHORIZED",
      null
    );

    return res.status(401).json(responseData);
  }

  req.customer = payload;

  next();
};

export default authentication;
