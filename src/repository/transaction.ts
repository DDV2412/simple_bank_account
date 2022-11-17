const { transaction: Transaction } = require("../models");

class TransactionRepo {
  private transaction = Transaction;

  createTransaction = async (transaction: Object) => {
    try {
      return await this.transaction.create(transaction);
    } catch (error) {
      return null;
    }
  };
}

export default TransactionRepo;
