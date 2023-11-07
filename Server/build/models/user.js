"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const databases_1 = __importDefault(require("../databases"));
exports.User = databases_1.default.define('user', {
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING(180),
        allowNull: true // Puedes ajustar esto según tus necesidades
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING(180),
        allowNull: true // Puedes ajustar esto según tus necesidades
    },
    username: {
        type: sequelize_1.DataTypes.STRING(180),
        allowNull: true // Puedes ajustar esto según tus necesidades
    }
}, {
    tableName: 'user',
    timestamps: false,
});
