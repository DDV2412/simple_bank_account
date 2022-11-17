import { Response, Request } from "express";
import Validation from "../validate";
import ResponseData from "../utils/ResponseData";

export default {
  register: async (req: Request, res: Response) => {
    const { error } = new Validation(req.body).register();

    if (error) {
      const responseData: ResponseData = new ResponseData(
        false,
        error["details"][0].message,
        null
      );

      return res.status(400).json(responseData);
    }

    const customer = await req.customerUC.register(req.body);

    if (!customer) {
      const responseData: ResponseData = new ResponseData(
        false,
        "Username or email not avalaible",
        null
      );

      return res.status(400).json(responseData);
    }

    const account = await req.accountUC.createAccount({
      customerId: customer?.payload.id,
      accType: "deposits",
    });

    const responseData: ResponseData = new ResponseData(
      true,
      "Successfully saved new customer",
      {
        id: customer?.payload.id,
        userName: customer?.payload.userName,
        balance: account["balance"],
        token: customer?.token,
      }
    );

    return res.status(200).json(responseData);
  },
  login: async (req: Request, res: Response) => {
    const { error } = new Validation(req.body).login();

    if (error) {
      const responseData: ResponseData = new ResponseData(
        false,
        error["details"][0].message,
        null
      );

      return res.status(400).json(responseData);
    }

    const customer = await req.customerUC.login(req.body);

    if (!customer) {
      const responseData: ResponseData = new ResponseData(
        false,
        "Username or password not match",
        null
      );

      return res.status(400).json(responseData);
    }

    const responseData: ResponseData = new ResponseData(true, "", {
      id: customer?.payload.id,
      userName: customer?.payload.userName,
      accountId: customer.payload.accountId,
      balance: customer.payload.balence,
      token: customer?.token,
    });

    return res.status(200).json(responseData);
  },
};
