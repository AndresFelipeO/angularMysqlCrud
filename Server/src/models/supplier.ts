import { DataTypes } from 'sequelize';
import sequelize from '../databases';

export const Supplier = sequelize.define('supplier', {
    supplierid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      supplier_name: {
        type: DataTypes.STRING(180),
      },
      supplier_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
},{
    tableName: 'supplier', 
    timestamps: false,
});