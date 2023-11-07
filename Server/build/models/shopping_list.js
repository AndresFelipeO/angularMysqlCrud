"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shopping_list = void 0;
const sequelize_1 = require("sequelize");
const databases_1 = __importDefault(require("../databases"));
const user_1 = require("./user");
exports.Shopping_list = databases_1.default.define('Shopping_list', {
    listid: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    list_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    list_name: {
        type: sequelize_1.DataTypes.STRING(180),
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: 'userid',
        },
    },
}, {
    tableName: 'Shopping_list',
    timestamps: false,
});
