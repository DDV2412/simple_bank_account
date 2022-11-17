import { Router } from "express";
import Customer from "../controllers/customer";
import Transaction from "../controllers/transaction";
import Balance from "../controllers/account";
import authentication from "../middleware/auth";

class Routers {
  route: Router = Router();

  constructor() {
    this.route.post("/register", Customer.register);
    this.route.post("/login", Customer.login);
    this.route.post("/deposit", authentication, Transaction.deposit);
    this.route.post("/withdrawal", authentication, Transaction.withdrawal);
    this.route.get("/balance", authentication, Balance.balance);
  }
}

export default new Routers().route;
