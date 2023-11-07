import { DataTypes } from 'sequelize';
import sequelize from '../databases';

export const User = sequelize.define('user', {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(180),
        allowNull: true // Puedes ajustar esto según tus necesidades
    },
    user_password: {
        type: DataTypes.STRING(180),
        allowNull: true // Puedes ajustar esto según tus necesidades
    },
    username: {
        type: DataTypes.STRING(180),
        allowNull: true // Puedes ajustar esto según tus necesidades
    }
},{
    tableName: 'user', 
    timestamps: false,
});