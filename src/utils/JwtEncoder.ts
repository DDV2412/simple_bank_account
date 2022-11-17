import jwt from "jsonwebtoken";

class JWTUtils {
  jwt = jwt;
  encode = (payload: any, expiresIn: string) => {
    return this.jwt.sign(payload, String(process.env.JWT_SECRET), {
      expiresIn: expiresIn,
    });
  };

  decode = (payload: any) => {
    return this.jwt.verify(payload, String(process.env.JWT_SECRET));
  };
}

export default new JWTUtils();
