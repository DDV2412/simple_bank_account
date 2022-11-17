import { Response, Request, NextFunction } from "express";
import ResponseData from "../utils/ResponseData";
import ResponseError from "../utils/ResponseError";

export default {
  balance: async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Balance']
      #swagger.summary = 'Balance Checking'
      #swagger.description = 'Balance Checking'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.responses[200] = {
            description: 'Category List',
            schema: {
                    "status": true,
                    "message": "",
                    "payload": {
                        "customerId": "ab269a5a-a8ab-45c2-a079-32dfe174241b",
                        "currentBalance": 4383401.762220003
                    }
            }
      }
      #swagger.responses[500] = {
            description: 'Deposit Error',
            schema: {
                    "status": false,
                    "message": "Internal server error",
                    "payload": null                           
            }
      }
      */
    const checking = await req.accountUC.findByCustomerId(req.customer["id"]);

    if (!checking) {
      const responseError: ResponseError = new ResponseError(
        false,
        "Internal server error",
        500
      );

      return next(responseError);
    }

    const payload = {
      customerId: req.customer["id"],
      currentBalance: checking["balance"],
    };

    const responseData: ResponseData = new ResponseData(true, "", payload);

    return res.json(responseData);
  },
};
