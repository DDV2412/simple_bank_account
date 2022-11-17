("use strict");
import { InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = (sequelize: any, DataTypes: any) => {
  class transaction extends Model<
    InferAttributes<transaction>,
    InferCreationAttributes<transaction>
  > {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare customerId: string;
    declare amount: number;
    declare type: string;
    declare receiverName: string;
    declare receiverAccount: string;

    static associate(models: any) {
      this.belongsTo(models.customer, {
        foreignKey: "customerId",
        targetKey: "id",
      });
    }
  }
  transaction.init(
    {
      customerId: DataTypes.UUID,
      receiverAccount: DataTypes.UUID,
      receiverName: DataTypes.STRING,
      type: DataTypes.ENUM(
        "withdrawals",
        "deposits",
        "checks",
        "online payments",
        "debit card charges",
        "transfers",
        "loan payments"
      ),
      amount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );

  transaction.beforeSave("beforeSave", (transactionData) => {
    transactionData["id"] = uuidv4();
  });
  return transaction;
};
