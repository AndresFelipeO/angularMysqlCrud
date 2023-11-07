"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const shoppingListRoutes_1 = __importDefault(require("./routes/shoppingListRoutes"));
const supplierRoutes_1 = __importDefault(require("./routes/supplierRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const listProductRoute_1 = __importDefault(require("./routes/listProductRoute"));
const user_1 = require("./models/user");
const shopping_list_1 = require("./models/shopping_list");
const supplier_1 = require("./models/supplier");
const product_1 = require("./models/product");
const list_product_1 = require("./models/list_product");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.dbConnect();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/product', productRoutes_1.default);
        this.app.use('/api/shoppingList', shoppingListRoutes_1.default);
        this.app.use('/api/supplier', supplierRoutes_1.default);
        this.app.use('/api/listProduct', listProductRoute_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server port ', this.app.get('port'));
        });
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.User.sync();
                yield shopping_list_1.Shopping_list.sync();
                yield supplier_1.Supplier.sync();
                yield product_1.Product.sync();
                yield list_product_1.List_product.sync();
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
const server = new Server();
server.start();
