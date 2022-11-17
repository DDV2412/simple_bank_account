"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, UUIDV4 } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable("transactions", {
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
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(
          "withdrawals",
          "deposits",
          "checks",
          "online payments",
          "debit card charges",
          "transfers",
          "loan payments"
        ),
        allowNull: false,
      },
      receiverName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      receiverAccount: {
        type: Sequelize.UUID,
        allowNull: false,
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
    await queryInterface.dropTable("transactions");
  },
};
