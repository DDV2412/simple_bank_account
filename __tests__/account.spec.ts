import Account from "../src/controllers/account";

let mockAcount = {
  findByCustomerId: jest.fn().mockReturnValue(null),
};

let mockAcountResult = {
  findByCustomerId: jest.fn().mockReturnValue({
    id: "b7c2c082-f0b4-4289-b744-e0a224b68642",
    customerId: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
    accType: "deposits",
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

describe("Account Controller", () => {
  test("Check Balance Return 500", async () => {
    let req = mockRequest(
      {},
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      { accountUC: mockAcount }
    );
    let res = mockResponse();

    await Account.balance(req, res, jest.fn());

    expect(mockAcount.findByCustomerId).toBeCalledWith(req.customer["id"]);

    expect(res.status).toBeFalsy;
  });

  test("Check Balance Return 200", async () => {
    let req = mockRequest(
      {},
      {},
      {},
      { id: "ab269a5a-a8ab-45c2-a079-32dfe174241b" },
      { accountUC: mockAcountResult }
    );
    let res = mockResponse();

    await Account.balance(req, res, jest.fn());

    expect(mockAcountResult.findByCustomerId).toBeCalledWith(
      req.customer["id"]
    );

    expect(res.json).toBeCalledWith({
      status: true,
      message: "",
      payload: {
        customerId: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
        currentBalance: 5000000.0,
      },
    });
  });
});
