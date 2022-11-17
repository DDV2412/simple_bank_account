const { customer: Customer, account: Account } = require("../models");
import Bcrypt from "../utils/Bcrypt";

class CustomerRepo {
  private customer = Customer;
  private account = Account;

  findById = async (id: string) => {
    try {
      return await this.customer.findByPk(id);
    } catch (error) {
      return null;
    }
  };

  findByUserName = async (userName: string) => {
    try {
      return await this.customer.findOne({
        where: {
          userName: userName,
        },
        include: [this.account],
      });
    } catch (error) {
      return null;
    }
  };

  createCustomer = async (customer: Object) => {
    try {
      customer["password"] = Bcrypt.hashPass(customer["password"]);
      return await this.customer.create(customer);
    } catch (error) {
      return null;
    }
  };
}
export default CustomerRepo;
