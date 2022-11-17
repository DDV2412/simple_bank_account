("use strict");
import { InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = (sequelize: any, DataTypes: any) => {
  class customer extends Model<
    InferAttributes<customer>,
    InferCreationAttributes<customer>
  > {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    declare userName: string;
    declare fullName: string;
    declare email: string;
    declare password: string;
    declare address: string;

    static associate(models: any) {
      this.hasOne(models.account, {
        foreignKey: "customerId",
        sourceKey: "id",
      });
      this.hasMany(models.transaction, {
        foreignKey: "customerId",
        sourceKey: "id",
      });
    }
  }
  customer.init(
    {
      userName: DataTypes.STRING,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "customer",
    }
  );

  customer.beforeSave("beforeSave", (customerData) => {
    customerData["id"] = uuidv4();
  });
  return customer;
};
