import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
const { sequelize } = require("./models");
import routers from "./router";
import AccountUseCase from "./use_cases/account";
import CustomerUseCase from "./use_cases/customer";
import TransactionUseCase from "./use_cases/transaction";
import CustomerRepo from "./repository/customer";
import AccountRepo from "./repository/account";
import TransactionRepo from "./repository/transaction";
import errorMiddleWare from "./middleware/errorMiddleware";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/doc.json");

const customerUC = new CustomerUseCase(new CustomerRepo());
const accountUC = new AccountUseCase(new AccountRepo());
const transactionUC = new TransactionUseCase(new TransactionRepo());

declare global {
  namespace Express {
    interface Request {
      customerUC: CustomerUseCase;
      accountUC: AccountUseCase;
      transactionUC: TransactionUseCase;
      customer: any;
    }
  }
}

class Application {
  public app: Express = express();

  constructor() {
    /**
     * Checking Connection Database
     */
    try {
      sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(morgan("combined"));

    this.app.use((req, res, next) => {
      req.customerUC = customerUC;
      req.accountUC = accountUC;
      req.transactionUC = transactionUC;

      next();
    });

    this.app.use("/api", routers);

    this.app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, {
        swaggerOptions: { persistAuthorization: true },
      })
    );

    this.app.use(errorMiddleWare);
  }
}

export default Application;
