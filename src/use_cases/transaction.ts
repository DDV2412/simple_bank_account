import TransactionRepo from "../repository/transaction";

class TransactionUseCase {
  transaction: TransactionRepo;

  constructor(transaction: TransactionRepo) {
    this.transaction = transaction;
  }

  createTransaction = async (transaction: Object) => {
    return await this.transaction.createTransaction(transaction);
  };
}

export default TransactionUseCase;
