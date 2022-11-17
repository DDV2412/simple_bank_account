import Transaction from "../src/controllers/transaction";

let mockTransaction = {
  createTransaction: jest.fn().mockReturnValue(null),
};

let mockTransactionResult = {
  createTransaction: jest.fn().mockReturnValue({
    id: "b7c2c082-f0b4-4289-b744-e0a224b68642",
    customerId: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
    amount: 5000000.0,
    type: "deposits",
    receiverName: "Manager Admin",
    receiverAccount: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
  }),
};
let mockAcount = {
  findByCustomerId: jest.fn().mockReturnValue({
    id: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
    customerId: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
    accType: "deposits",
    balance: 5000000.0,
  }),
  depositsSaldo: jest.fn().mockReturnValue(null),
  withdrawalsSaldo: jest.fn().mockReturnValue({
    balance: 5000000.0,
  }),
};

let mockAcountResult = {
  findByCustomerId: jest.fn().mockReturnValue({
    id: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
    customerId: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
    accType: "deposits",
    balance: 5000000.0,
  }),
  depositsSaldo: jest.fn().mockReturnValue({
    balance: 5000000.0,
  }),
  withdrawalsSaldo: jest.fn().mockReturnValue({
    balance: 5000000.0,
  }),
};

let mockRequest = (
  body = {},
  query = {},
  params = {},
  customer: any = {},
  usecase: any = {}
) => {
  return {
    body,
    query,
    params,
    customer,
    ...usecase,
  };
};

let mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe("Transaction Controller", () => {
  test("Deposit Error Validation", async () => {
    let req = mockRequest(
      {
        amount: 50000.0,
        type: "deposits",
        receiverName: "Admin Manager",
      },
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      { transactionUC: mockTransactionResult }
    );
    let res = mockResponse();

    await Transaction.deposit(req, res, jest.fn());

    expect(res.status).toBeFalsy;
  });
  test("Deposit Error Internal Server", async () => {
    let req = mockRequest(
      {
        amount: 50000.0,
        type: "deposits",
        receiverName: "Admin Manager",
        receiverAccount: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
      },
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      { transactionUC: mockTransaction }
    );
    let res = mockResponse();

    await Transaction.deposit(req, res, jest.fn());

    await mockTransaction.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    expect(res.status).toBeFalsy;
  });
  test("Deposit Error Update Balance", async () => {
    let req = mockRequest(
      {
        amount: 50000.0,
        type: "deposits",
        receiverName: "Admin Manager",
        receiverAccount: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
      },
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      {
        transactionUC: mockTransactionResult,
        accountUC: mockAcount,
      }
    );
    let res = mockResponse();

    await Transaction.deposit(req, res, jest.fn());

    await mockTransactionResult.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    await mockAcount.depositsSaldo({
      customerId: req.customer.id,
      amount: req.body["amount"],
    });

    expect(res.status).toBeFalsy;
  });
  test("Deposit Success", async () => {
    let req = mockRequest(
      {
        amount: 50000.0,
        type: "deposits",
        receiverName: "Admin Manager",
        receiverAccount: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
      },
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      { transactionUC: mockTransactionResult, accountUC: mockAcountResult }
    );
    let res = mockResponse();

    await Transaction.deposit(req, res, jest.fn());

    await mockTransaction.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    await mockAcountResult.depositsSaldo({
      customerId: req.customer.id,
      amount: req.body["amount"],
    });

    expect(res.json).toBeCalledWith({
      status: true,
      message: "",
      payload: {
        id: "b7c2c082-f0b4-4289-b744-e0a224b68642",
        customerId: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
        amount: 50000,
        currentBalance: 5000000.0,
      },
    });
  });

  test("Withdrawal Error Validation", async () => {
    let req = mockRequest(
      {
        amount: 50000.0,
        type: "withdrawals",
        receiverName: "Admin Manager",
      },
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      { transactionUC: mockTransactionResult }
    );
    let res = mockResponse();

    await Transaction.withdrawal(req, res, jest.fn());

    expect(res.status).toBeFalsy;
  });
  test("Withdrawal Error Internal Server", async () => {
    let req = mockRequest(
      {
        amount: 50000.0,
        type: "withdrawals",
        receiverName: "Admin Manager",
        receiverAccount: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
      },
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      { transactionUC: mockTransaction, accountUC: mockAcountResult }
    );
    let res = mockResponse();

    await Transaction.withdrawal(req, res, jest.fn());

    await mockTransaction.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    expect(res.status).toBeFalsy;
  });
  test("Withdrawal Error Update Balance", async () => {
    let req = mockRequest(
      {
        amount: 50000.0,
        type: "withdrawals",
        receiverName: "Admin Manager",
        receiverAccount: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
      },
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      {
        transactionUC: mockTransactionResult,
        accountUC: mockAcount,
      }
    );
    let res = mockResponse();

    await Transaction.withdrawal(req, res, jest.fn());

    await mockTransactionResult.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    await mockAcount.depositsSaldo({
      customerId: req.customer.id,
      amount: req.body["amount"],
    });

    expect(res.status).toBeFalsy;
  });
  test("Withdrawal Success", async () => {
    let req = mockRequest(
      {
        amount: 50000.0,
        type: "withdrawals",
        receiverName: "Admin Manager",
        receiverAccount: "9e7f5a12-309f-4e39-bd3e-ed566d966f68",
      },
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      { transactionUC: mockTransactionResult, accountUC: mockAcountResult }
    );
    let res = mockResponse();

    await Transaction.withdrawal(req, res, jest.fn());

    await mockTransaction.createTransaction({
      customerId: req.customer.id,
      amount: req.body["amount"],
      type: req.body["type"],
      receiverName: req.body["receiverName"],
      receiverAccount: req.body["receiverAccount"],
    });

    await mockAcountResult.withdrawalsSaldo({
      customerId: req.customer.id,
      amount: req.body["amount"],
    });

    expect(res.json).toBeCalledWith({
      status: true,
      message: "",
      payload: {
        id: "b7c2c082-f0b4-4289-b744-e0a224b68642",
        customerId: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
        amount: 50000,
        currentBalance: 5000000.0,
      },
    });
  });
});
