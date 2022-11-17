import swaggerAutogen from "swagger-autogen";
import path from "path";

require("dotenv").config();

const doc = {
  securityDefinitions: {
    info: {
      title: "Simple Bank Account",
      description: "Simple Bank Account",
    },
    host: String(process.env.APP_URI) + ":" + String(process.env.APP_PORT),
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
    schemes: ["http"],
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token>**",
    },
  },
};
const outputFile = path.join(__dirname + "/doc/doc.json");
const endpointsFiles = [path.join(__dirname + "/app.ts")];

swaggerAutogen()(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r);
});
