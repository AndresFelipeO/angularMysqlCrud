"use strict";
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
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
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
}
const server = new Server();
server.start();
