"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, UUIDV4 } from "sequelize";
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable("account", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: "customers",
          },
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      accType: {
        type: Sequelize.ENUM("loan", "deposits"),
        allowNull: false,
      },
      balance: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable("account");
  },
};
