import { Response, Request, NextFunction } from "express";
import Validation from "../validate";
import ResponseData from "../utils/ResponseData";

export default {
  deposit: async (req: Request, res: Response, next: NextFunction) => {
    const { error } = new Validation(req.body).transaction();

    if (error) {
      const responseData: ResponseData = new ResponseData(
        false,
        error["details"][0].message,
        null
      );

      return res.status(400).json(responseData);
    }

    const transaction = await req.transactionUC.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    if (!transaction) {
      const responseData: ResponseData = new ResponseData(
        false,
        "Internet server error",
        null
      );

      return res.status(500).json(responseData);
    }

    const balance = await req.accountUC.depositsSaldo(
      req.customer["id"],
      req.body.amount
    );

    if (!balance) {
      const responseData: ResponseData = new ResponseData(
        false,
        "Internet server error",
        null
      );

      return res.status(500).json(responseData);
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

  withdrawal: async (req: Request, res: Response) => {
    const { error } = new Validation(req.body).transaction();

    if (error) {
      const responseData: ResponseData = new ResponseData(
        false,
        error["details"][0].message,
        null
      );

      return res.status(400).json(responseData);
    }

    const currentBalance = await req.accountUC.findByCustomerId(
      req.customer["id"]
    );

    const checkBeforeWithdrawal = currentBalance["balance"] - req.body.amount;
    if (checkBeforeWithdrawal < 0) {
      const responseData: ResponseData = new ResponseData(
        false,
        "Your account balance is insufficient",
        null
      );

      return res.status(400).json(responseData);
    }

    const transaction = await req.transactionUC.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    if (!transaction) {
      const responseData: ResponseData = new ResponseData(
        false,
        "Internet server error",
        null
      );

      return res.status(500).json(responseData);
    }

    const balance = await req.accountUC.withdrawalsSaldo(
      req.customer["id"],
      req.body.amount
    );

    if (!balance) {
      const responseData: ResponseData = new ResponseData(
        false,
        "Internet server error",
        null
      );

      return res.status(500).json(responseData);
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
};
