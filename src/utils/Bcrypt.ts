import { hashSync, compareSync } from "bcrypt";

class BcryptUtil {
  hashPass = (pass: string) => {
    return hashSync(pass, 12);
  };

  checkPass = (userPass: string, pass: string) => {
    return compareSync(pass, userPass);
  };
}

export default new BcryptUtil();
