import { Response, Request, NextFunction } from "express";
import ResponseData from "../utils/ResponseData";

export default {
  balance: async (req: Request, res: Response, next: NextFunction) => {
    const checking = await req.accountUC.findByCustomerId(req.customer["id"]);

    const payload = {
      customerId: req.customer["id"],
      currentBalance: checking["balance"],
    };

    const responseData: ResponseData = new ResponseData(true, "", payload);

    return res.status(200).json(responseData);
  },
};
