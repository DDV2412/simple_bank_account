import Customer from "../src/controllers/customer";

let mockAcount = {
  createAccount: jest.fn().mockReturnValue({
    id: "b7c2c082-f0b4-4289-b744-e0a224b68642",
    customerId: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
    accType: "deposits",
    balance: 0,
  }),
};

let mockCustomer = {
  register: jest.fn().mockReturnValue(null),
  login: jest.fn().mockReturnValue(null),
};

let mockCustomerResult = {
  register: jest.fn().mockReturnValue({
    payload: {
      id: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
      userName: "admin2412",
    },
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiMjY5YTVhLWE4YWItNDVjMi1hMDc5LTMyZGZlMTc0MjQxYiIsInVzZXJOYW1lIjoiYWRtaW4yNDEyIiwiYWNjb3VudElkIjoiYjdjMmMwODItZjBiNC00Mjg5LWI3NDQtZTBhMjI0YjY4NjQyIiwiYmFsZW5jZSI6NDM4MzQwMS43NjIyMjAwMDMsImlhdCI6MTY2ODY2MzQ3NCwiZXhwIjoxNjY4NjY3MDc0fQ.HfDeuSg67XLHBsX0fjhOuUac43LmJ6Mp-N9uQ-kpEPc",
  }),
  login: jest.fn().mockReturnValue({
    payload: {
      id: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
      userName: "admin2412",
      accountId: "b7c2c082-f0b4-4289-b744-e0a224b68642",
      balance: 0,
    },
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiMjY5YTVhLWE4YWItNDVjMi1hMDc5LTMyZGZlMTc0MjQxYiIsInVzZXJOYW1lIjoiYWRtaW4yNDEyIiwiYWNjb3VudElkIjoiYjdjMmMwODItZjBiNC00Mjg5LWI3NDQtZTBhMjI0YjY4NjQyIiwiYmFsZW5jZSI6NDM4MzQwMS43NjIyMjAwMDMsImlhdCI6MTY2ODY2MzQ3NCwiZXhwIjoxNjY4NjY3MDc0fQ.HfDeuSg67XLHBsX0fjhOuUac43LmJ6Mp-N9uQ-kpEPc",
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

describe("Customer Controller", () => {
  test("Register Error Validation", async () => {
    let req = mockRequest(
      {
        userName: "admin2412",
        fullName: "Manager Admin",
        email: "admin@mail.com",
        password: "Admin2346#",
        address: "New York",
      },
      {},
      {},
      {},
      { customerUC: mockCustomer }
    );
    let res = mockResponse();

    await Customer.register(req, res, jest.fn());

    expect(res.status).toBeFalsy;
  });
  test("Register Error", async () => {
    let req = mockRequest(
      {
        userName: "admin2412",
        fullName: "Manager Admin",
        email: "admin@mail.com",
        password: "Admin2346#",
        address: "New York",
      },
      {},
      {},
      {},
      { customerUC: mockCustomer }
    );
    let res = mockResponse();

    await Customer.register(req, res, jest.fn());

    expect(mockCustomer.register).toBeCalledWith(req.body);
    expect(res.status).toBeFalsy;
  });
  test("Register Success", async () => {
    let req = mockRequest(
      {
        userName: "admin2412",
        fullName: "Manager Admin",
        email: "admin@mail.com",
        password: "Admin2346#",
        address: "New York",
      },
      {},
      {},
      {},
      { customerUC: mockCustomerResult, accountUC: mockAcount }
    );
    let res = mockResponse();

    await Customer.register(req, res, jest.fn());

    expect(mockCustomerResult.register).toBeCalledWith(req.body);

    expect(res.json).toBeCalledWith({
      status: true,
      message: "Successfully saved new customer",
      payload: {
        id: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
        userName: "admin2412",
        balance: 0,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiMjY5YTVhLWE4YWItNDVjMi1hMDc5LTMyZGZlMTc0MjQxYiIsInVzZXJOYW1lIjoiYWRtaW4yNDEyIiwiYWNjb3VudElkIjoiYjdjMmMwODItZjBiNC00Mjg5LWI3NDQtZTBhMjI0YjY4NjQyIiwiYmFsZW5jZSI6NDM4MzQwMS43NjIyMjAwMDMsImlhdCI6MTY2ODY2MzQ3NCwiZXhwIjoxNjY4NjY3MDc0fQ.HfDeuSg67XLHBsX0fjhOuUac43LmJ6Mp-N9uQ-kpEPc",
      },
    });
  });

  test("Login Error Validation", async () => {
    let req = mockRequest(
      {
        userName: "admin2412",
      },
      {},
      {},
      {},
      { customerUC: mockCustomer }
    );
    let res = mockResponse();

    await Customer.login(req, res, jest.fn());

    expect(res.status).toBeFalsy;
  });
  test("Login Error", async () => {
    let req = mockRequest(
      {
        userName: "admin2412",
        password: "Admin2346#",
      },
      {},
      {},
      {},
      { customerUC: mockCustomer }
    );
    let res = mockResponse();

    await Customer.login(req, res, jest.fn());

    expect(mockCustomer.login).toBeCalledWith(req.body);
    expect(res.status).toBeFalsy;
  });
  test("Login Success", async () => {
    let req = mockRequest(
      {
        userName: "admin2412",
        password: "Admin2346#",
      },
      {},
      {},
      {},
      { customerUC: mockCustomerResult, accountUC: mockAcount }
    );
    let res = mockResponse();

    await Customer.login(req, res, jest.fn());

    expect(mockCustomerResult.login).toBeCalledWith(req.body);

    expect(res.json).toBeCalledWith({
      status: true,
      message: "",
      payload: {
        id: "ab269a5a-a8ab-45c2-a079-32dfe174241b",
        userName: "admin2412",
        accountId: "b7c2c082-f0b4-4289-b744-e0a224b68642",
        balance: 0,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiMjY5YTVhLWE4YWItNDVjMi1hMDc5LTMyZGZlMTc0MjQxYiIsInVzZXJOYW1lIjoiYWRtaW4yNDEyIiwiYWNjb3VudElkIjoiYjdjMmMwODItZjBiNC00Mjg5LWI3NDQtZTBhMjI0YjY4NjQyIiwiYmFsZW5jZSI6NDM4MzQwMS43NjIyMjAwMDMsImlhdCI6MTY2ODY2MzQ3NCwiZXhwIjoxNjY4NjY3MDc0fQ.HfDeuSg67XLHBsX0fjhOuUac43LmJ6Mp-N9uQ-kpEPc",
      },
    });
  });
});
