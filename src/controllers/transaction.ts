import { Response, Request, NextFunction } from "express";
import Validation from "../validate";
import ResponseData from "../utils/ResponseData";
import ResponseError from "../utils/ResponseError";

export default {
  deposit: async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Transaction']
      #swagger.summary = 'Transaction Deposit'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Deposit'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Deposit',
            required: true,
            schema: {
               "amount": 50033400.44222,
               "type": "deposits",
               "receiverName": "Manager Admin",
               "receiverAccount": "b7c2c082-f0b4-4289-b744-e0a224b68642"           
            }
          },
      #swagger.responses[200] = {
            description: 'Create Category',
            schema: {
                    "status": true,
                    "message": "",
                    "payload": {
                        "id": "99d35255-9799-46b1-b948-07083894a1e5",
                        "customerId": "ab269a5a-a8ab-45c2-a079-32dfe174241b",
                        "amount": 50000.00,
                        "currentBalance": 50000.00
                    }                                        
            }
      }
      #swagger.responses[400] = {
            description: 'Deposit Error',
            schema: {
                    "status": false,
                    "message": "",
                    "payload": null                           
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
    const { error } = new Validation(req.body).transaction();

    if (error) {
      const responseError: ResponseError = new ResponseError(
        false,
        error["details"][0].message,
        400
      );

      return next(responseError);
    }

    const transaction = await req.transactionUC.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    if (!transaction) {
      const responseError: ResponseError = new ResponseError(
        false,
        "Internal server error",
        500
      );

      return next(responseError);
    }

    const balance = await req.accountUC.depositsSaldo(
      req.customer["id"],
      req.body.amount
    );

    if (!balance) {
      const responseError: ResponseError = new ResponseError(
        false,
        "Internal server error",
        500
      );

      return next(responseError);
    }

    const payload = {
      id: transaction["id"],
      customerId: req.customer["id"],
      amount: req.body["amount"],
      currentBalance: balance["balance"],
    };

    const responseData: ResponseData = new ResponseData(true, "", payload);

    return res.status(200).json(responseData);
  },

  withdrawal: async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Transaction']
      #swagger.summary = 'Transaction Withdrawal'
      #swagger.security = [{ "Bearer": [] }]
      #swagger.description = 'Withdrawal'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Withdrawal',
            required: true,
            schema: {
               "amount": 50000.00,
               "type": "withdrawals",
               "receiverName": "Manager Admin",
               "receiverAccount": "b7c2c082-f0b4-4289-b744-e0a224b68642"           
            }
          },
      #swagger.responses[200] = {
            description: 'Create Category',
            schema: {
                    "status": true,
                    "message": "",
                    "payload": {
                        "id": "99d35255-9799-46b1-b948-07083894a1e5",
                        "customerId": "ab269a5a-a8ab-45c2-a079-32dfe174241b",
                        "amount": 50000.00,
                        "currentBalance": 50000.00
                    }                                        
            }
      }
      #swagger.responses[400] = {
            description: 'Deposit Error',
            schema: {
                    "status": false,
                    "message": "Your account balance is insufficient",
                    "payload": null                           
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
    const { error } = new Validation(req.body).transaction();

    if (error) {
      const responseError: ResponseError = new ResponseError(
        false,
        error["details"][0].message,
        400
      );

      return next(responseError);
    }

    const currentBalance = await req.accountUC.findByCustomerId(
      req.customer["id"]
    );

    const checkBeforeWithdrawal = currentBalance["balance"] - req.body.amount;
    if (checkBeforeWithdrawal < 0) {
      const responseError: ResponseError = new ResponseError(
        false,
        "Your account balance is insufficient",
        400
      );

      return next(responseError);
    }

    const transaction = await req.transactionUC.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    if (!transaction) {
      const responseError: ResponseError = new ResponseError(
        false,
        "Internal server error",
        500
      );

      return next(responseError);
    }

    const balance = await req.accountUC.withdrawalsSaldo(
      req.customer["id"],
      req.body.amount
    );

    if (!balance) {
      const responseError: ResponseError = new ResponseError(
        false,
        "Internal server error",
        500
      );

      return next(responseError);
    }

    const payload = {
      id: transaction["id"],
      customerId: req.customer["id"],
      amount: req.body["amount"],
      currentBalance: balance["balance"],
    };

    const responseData: ResponseData = new ResponseData(true, "", payload);

    return res.json(responseData);
  },
};
