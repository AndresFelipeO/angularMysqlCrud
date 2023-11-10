"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List_product = void 0;
const sequelize_1 = require("sequelize");
const databases_1 = __importDefault(require("../databases"));
const shopping_list_1 = require("./shopping_list");
const product_1 = require("./product");
exports.List_product = databases_1.default.define('list_product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    listid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: shopping_list_1.Shopping_list,
            key: 'listid',
        },
    },
    productid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product_1.Product,
            key: 'productid',
        },
    },
    list_product_state: {
        type: sequelize_1.DataTypes.STRING(180),
    },
}, {
    tableName: 'list_product',
    timestamps: false,
});
