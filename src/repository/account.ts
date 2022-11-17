const { account: Account } = require("../models");

class AccountRepo {
  private account = Account;

  findByCustomerId = async (id: string) => {
    try {
      return await this.account.findOne({
        where: {
          customerId: id,
        },
      });
    } catch (error) {
      return null;
    }
  };

  createAccount = async (customer: Object) => {
    try {
      return await this.account.create(customer);
    } catch (error) {
      return null;
    }
  };

  updateSaldo = async (id: string, amount: number) => {
    try {
      return await this.account.update(
        {
          balance: amount,
        },
        {
          where: {
            customerId: id,
          },
        }
      );
    } catch (error) {
      return null;
    }
  };
}

export default AccountRepo;
