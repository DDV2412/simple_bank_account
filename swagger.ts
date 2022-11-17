import swaggerAutogen from "swagger-autogen";
import path from "path";

const doc = {
  info: {
    title: "Simple Bank Account",
    description: "Simple Bank Account",
  },
  host: "localhost:8090",
  schemes: ["http"],
  definitions: {
    customer: {
      id: String,
      userName: String,
      fullName: String,
      email: String,
      password: String,
      address: String,
      createdAt: Date,
      updatedAt: Date,
    },
    account: {
      id: String,
      customerId: String,
      accType: String,
      balance: String,
      createdAt: Date,
      updatedAt: Date,
    },
    transaction: {
      id: String,
      customerId: String,
      amount: Number,
      type: String,
      receiverName: String,
      receiverAccount: String,
      createdAt: Date,
      updatedAt: Date,
    },
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token>**",
    },
  },
};
const outputFile = "./src/doc/doc.json";
const endpointsFiles = ["./src/app.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});
