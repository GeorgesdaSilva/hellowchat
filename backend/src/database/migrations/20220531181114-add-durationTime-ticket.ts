import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addColumn("Tickets", "durationDate", {
      type: DataTypes.DATE,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    },);
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn("Tickets", "durationDate");
  }
};
