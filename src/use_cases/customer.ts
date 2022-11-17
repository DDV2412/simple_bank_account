import CustomerRepo from "../repository/customer";
import JwtEncoder from "../utils/JwtEncoder";
import Bcrypt from "../utils/Bcrypt";

class CustomerUseCase {
  customer: CustomerRepo;

  constructor(customer: CustomerRepo) {
    this.customer = customer;
  }

  generateToken = (customer: {}) => {
    return JwtEncoder.encode(customer, "1h");
  };

  findById = async (id: string) => {
    return await this.customer.findById(id);
  };

  register = async (customer: Object) => {
    const result = await this.customer.createCustomer(customer);

    if (!result) {
      return null;
    }

    const payload = {
      id: result["id"],
      userName: result["userName"],
    };

    const token = this.generateToken(payload);

    return {
      payload,
      token,
    };
  };

  login = async (customer: Object) => {
    const result = await this.customer.findByUserName(customer["userName"]);

    if (!result) {
      return null;
    }

    if (!Bcrypt.checkPass(result["password"], customer["password"])) {
      return null;
    }

    const payload = {
      id: result["id"],
      userName: result["userName"],
      accountId: result["account"]["id"],
      balence: result["account"]["balance"],
    };

    const token = this.generateToken(payload);

    return {
      payload,
      token,
    };
  };
}

export default CustomerUseCase;
