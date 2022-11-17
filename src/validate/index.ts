import joi from "joi";

class Validation {
  joi = joi;
  body: Object;
  constructor(body: Object) {
    this.body = body;
  }

  register = () => {
    return this.joi
      .object({
        userName: this.joi.string().min(8).required().messages({
          "string.empty": "Username cannot be an empty field",
          "any.required": "Username is required field",
          "string.min": `Username should have a minimum length of {#limit}`,
        }),
        fullName: this.joi.string().required().messages({
          "string.empty": "Full name cannot be an empty field",
          "any.required": "Full name is required field",
        }),
        email: this.joi.string().email().required().messages({
          "string.empty": "Email cannot be an empty field",
          "any.required": "Email is required field",
          "string.email": `Please insert a valid email address'`,
        }),
        password: this.joi
          .string()
          .required()
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .min(10)
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
        address: this.joi.string().required().messages({
          "string.empty": "Address name cannot be an empty field",
          "any.required": "Address name is required field",
        }),
      })
      .validate(this.body);
  };

  login = () => {
    return this.joi
      .object({
        userName: this.joi.string().min(8).required().messages({
          "string.empty": "Username cannot be an empty field",
          "any.required": "Username is required field",
          "string.min": `Username should have a minimum length of {#limit}`,
        }),
        password: this.joi
          .string()
          .required()
          .pattern(
            new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$")
          )
          .min(10)
          .messages({
            "string.empty": "Password cannot be an empty field",
            "string.pattern.base":
              "Invalid password, alphanumeric and characters",
            "string.min": `Password should have a minimum length of {#limit}`,
            "any.required": `Password is a required field`,
          }),
      })
      .validate(this.body);
  };

  transaction = () => {
    return this.joi
      .object({
        amount: this.joi.number().required().messages({
          "number.empty": "Amount cannot be an empty field",
          "any.required": "Amount is required field",
        }),
        type: this.joi.string().required().messages({
          "string.empty": "Type transaction cannot be an empty field",
          "any.required": "Type transaction is required field",
        }),
        receiverName: this.joi.string().required().messages({
          "string.empty": "Receiver name cannot be an empty field",
          "any.required": "Receiver name is required field",
        }),
        receiverAccount: this.joi.string().required().messages({
          "string.empty": "Receiver Account cannot be an empty field",
          "any.required": `Receiver Account is a required field`,
        }),
      })
      .validate(this.body);
  };
}

export default Validation;
