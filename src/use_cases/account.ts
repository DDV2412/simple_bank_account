import AccountRepo from "../repository/account";

class AccountUseCase {
  account: AccountRepo;

  constructor(account: AccountRepo) {
    this.account = account;
  }

  findByCustomerId = async (id: string) => {
    return await this.account.findByCustomerId(id);
  };

  createAccount = async (customer: Object) => {
    return await this.account.createAccount(customer);
  };

  withdrawalsSaldo = async (id: string, amount: number) => {
    const currentBalance = await this.account.findByCustomerId(id);

    const totalBalance = currentBalance["balance"] - amount;

    const balance = await this.account.updateSaldo(id, totalBalance);

    if (!balance) {
      return null;
    }

    const updateBalance = await this.account.findByCustomerId(id);

    return {
      balance: updateBalance["balance"],
    };
  };

  depositsSaldo = async (id: string, amount: number) => {
    const currentBalance = await this.account.findByCustomerId(id);

    const totalBalance = currentBalance["balance"] + amount;

    const balance = await this.account.updateSaldo(id, totalBalance);

    if (!balance) {
      return null;
    }

    const updateBalance = await this.account.findByCustomerId(id);

    return {
      balance: updateBalance["balance"],
    };
  };
}

export default AccountUseCase;
