import { DataTypes } from 'sequelize';
import sequelize from '../databases';
import { User } from './user';

export const Shopping_list = sequelize.define('Shopping_list', {
    listid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    list_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    list_name: {
        type: DataTypes.STRING(180),
    },
    userid: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // Nombre del modelo de usuario en tu aplicación
            key: 'userid',
        },
    },
}, {
    tableName: 'Shopping_list',
    timestamps: false,
});