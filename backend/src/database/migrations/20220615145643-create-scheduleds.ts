import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Scheduleds", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "open",
      },
      title: {
        type: DataTypes.STRING
      },
      anfitriao: {
        type: DataTypes.JSONB,
     
      },
      startDate: {
        type: DataTypes.DATE,
      
      },
      endDate: {
        type: DataTypes.DATE,
       
      },
      recorrency: {
        type: DataTypes.INTEGER,
      },
      locale: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      user: {
        type:DataTypes.JSONB,
      
      },
      typeEvent: {
        type: DataTypes.INTEGER,
      },
      level: {
        type: DataTypes.INTEGER,

      },
      notificationType: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),

      }, 
      datesNotify: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      externals: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
      },
      attendants: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE(6),
      },
      updatedAt: {
        type: DataTypes.DATE(6),
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("Scheduleds");
  }
};
