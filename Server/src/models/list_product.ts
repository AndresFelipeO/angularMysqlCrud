import { DataTypes } from 'sequelize';
import sequelize from '../databases';
import { Shopping_list } from './shopping_list';
import { Product } from './product';

export const List_product = sequelize.define('list_product', {
    listid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Shopping_list, // Nombre del modelo de shopping_list en tu aplicación
          key: 'listid',
        },
      },
      productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Product, // Nombre del modelo de product en tu aplicación
          key: 'productid',
        },
      },
      list_product_state: {
        type: DataTypes.STRING(180),
      },
},{
    tableName: 'list_product', 
    timestamps: false,
}
);
