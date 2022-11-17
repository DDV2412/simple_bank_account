("use strict");
import { InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = (sequelize: any, DataTypes: any) => {
  class account extends Model<
    InferAttributes<account>,
    InferCreationAttributes<account>
  > {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare customerId: string;
    declare accType: string;
    declare balance: number;

    static associate(models: any) {
      this.belongsTo(models.customer, {
        foreignKey: "customerId",
        targetKey: "id",
      });
    }
  }
  account.init(
    {
      customerId: DataTypes.UUID,
      accType: DataTypes.ENUM("loan", "deposits"),
      balance: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "account",
      tableName: "account",
    }
  );

  account.beforeSave("beforeSave", (accountData) => {
    accountData["id"] = uuidv4();
  });
  return account;
};
