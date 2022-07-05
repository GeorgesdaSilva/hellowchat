import { QueryInterface, DataTypes } from "sequelize";
const date = new Date();
const start1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0);
const end1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
const start2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0);
const end2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0);
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("OpeningHours", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
  
      },
      message: {
        type: DataTypes.STRING,
        defaultValue:""
      },
      days: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [
          { "index": 0, "label": "Domingo", "open": false, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
          { "index": 1, "label": "Segunda", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
          { "index": 2, "label": "Terça", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
          { "index": 3, "label": "Quarta", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
          { "index": 4, "label": "Quinta", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
          { "index": 5, "label": "Sexta", "open": true, "start1": start1, "end1": end1, "start2": start2, "end2": end2 },
          { "index": 6, "label": "Sábado", "open": false, "start1": start1, "end1": end1, "start2": start2, "end2": end2 }
        ]
      },
      createdAt: {
        type: DataTypes.DATE(),
        defaultValue:new Date()
      },
      updatedAt: {
        type: DataTypes.DATE(),
        defaultValue:new Date()
      }


    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("OpeningHours");
  }
};
