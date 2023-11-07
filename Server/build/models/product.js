"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const databases_1 = __importDefault(require("../databases"));
const supplier_1 = require("./supplier");
exports.Product = databases_1.default.define('product', {
    productid: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    product_name: {
        type: sequelize_1.DataTypes.STRING(180),
    },
    product_price: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    product_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    supplierid: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: supplier_1.Supplier,
            key: 'supplierid',
        },
    },
}, {
    tableName: 'product',
    timestamps: false,
});
