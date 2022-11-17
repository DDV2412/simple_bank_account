import { Response, Request, NextFunction } from "express";
import Validation from "../validate";
import ResponseData from "../utils/ResponseData";
import ResponseError from "../utils/ResponseError";

export default {
  register: async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Authentication register'
      #swagger.description = 'Authentication register'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication register',
            required: true,
            schema: {
              "userName": "admin2412",
              "fullName": "Manager Admin",
              "email": "admin@mail.com",
              "password": "Admin2346#",
              "address": "New York"
            }
          },
      #swagger.responses[200] = {
            description: 'Successfully saved new customer',
            schema: {
                    "status": true,
                     "message": "",
                     "payload": {
                        "id": "ab269a5a-a8ab-45c2-a079-32dfe174241b",
                        "userName": "admin2412",
                        "accountId": "b7c2c082-f0b4-4289-b744-e0a224b68642",
                        "balance": 4383401.762220003,
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiMjY5YTVhLWE4YWItNDVjMi1hMDc5LTMyZGZlMTc0MjQxYiIsInVzZXJOYW1lIjoiYWRtaW4yNDEyIiwiYWNjb3VudElkIjoiYjdjMmMwODItZjBiNC00Mjg5LWI3NDQtZTBhMjI0YjY4NjQyIiwiYmFsZW5jZSI6NDM4MzQwMS43NjIyMjAwMDMsImlhdCI6MTY2ODY2MzQ3NCwiZXhwIjoxNjY4NjY3MDc0fQ.HfDeuSg67XLHBsX0fjhOuUac43LmJ6Mp-N9uQ-kpEPc"
                      }
            }
      }
      #swagger.responses[400] = {
            description: 'Register error.',
            schema: {
                    success: false,
                    "message": "Username or email not avalaible",
            }
      }
      */
    const { error } = new Validation(req.body).register();

    if (error) {
      const responseError: ResponseError = new ResponseError(
        false,
        error["details"][0].message,
        400
      );

      return next(responseError);
    }

    const customer = await req.customerUC.register(req.body);

    if (!customer) {
      const responseError: ResponseError = new ResponseError(
        false,
        "Username or email not avalaible",
        400
      );

      return next(responseError);
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
  login: async (req: Request, res: Response, next: NextFunction) => {
    /**
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Authentication Login'
      #swagger.description = 'Authentication Login'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Authentication Login',
            required: true,
            schema: {
              "userName": "admin2412",
              "password": "Admin2346#",
            }
          },
      #swagger.responses[200] = {
            description: 'Successfully saved new customer',
            schema: {
                    "status": true,
                     "message": "",
                     "payload": {
                        "id": "ab269a5a-a8ab-45c2-a079-32dfe174241b",
                        "userName": "admin2412",
                        "accountId": "b7c2c082-f0b4-4289-b744-e0a224b68642",
                        "balance": 4383401.762220003,
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiMjY5YTVhLWE4YWItNDVjMi1hMDc5LTMyZGZlMTc0MjQxYiIsInVzZXJOYW1lIjoiYWRtaW4yNDEyIiwiYWNjb3VudElkIjoiYjdjMmMwODItZjBiNC00Mjg5LWI3NDQtZTBhMjI0YjY4NjQyIiwiYmFsZW5jZSI6NDM4MzQwMS43NjIyMjAwMDMsImlhdCI6MTY2ODY2MzQ3NCwiZXhwIjoxNjY4NjY3MDc0fQ.HfDeuSg67XLHBsX0fjhOuUac43LmJ6Mp-N9uQ-kpEPc"
                      }
            }
      }
      #swagger.responses[400] = {
            description: 'Register error.',
            schema: {
                    success: false,
                    "message": "Username or password not match",
            }
      }
      */
    const { error } = new Validation(req.body).login();

    if (error) {
      const responseError: ResponseError = new ResponseError(
        false,
        error["details"][0].message,
        400
      );

      return next(responseError);
    }

    const customer = await req.customerUC.login(req.body);

    if (!customer) {
      const responseError: ResponseError = new ResponseError(
        false,
        "Username or password not match",
        400
      );

      return next(responseError);
    }

    const responseData: ResponseData = new ResponseData(true, "", {
      id: customer?.payload.id,
      userName: customer?.payload.userName,
      accountId: customer.payload.accountId,
      balance: customer.payload.balance,
      token: customer?.token,
    });

    return res.json(responseData);
  },
};
