import { DataTypes } from 'sequelize';
import sequelize from '../databases';
import { Supplier } from './supplier';

export const Product = sequelize.define('product', {
    productid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING(180),
      },
      product_price: {
        type: DataTypes.DOUBLE,
      },
      product_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      supplierid: {
        type: DataTypes.INTEGER,
        references: {
          model: Supplier, // Modelo de Supplier en tu aplicación
          key: 'supplierid',
        },
      },
},{
    tableName: 'product', 
    timestamps: false,
});