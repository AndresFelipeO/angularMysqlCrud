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
const databases_1 = __importDefault(require("../databases"));
class ProductListController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield databases_1.default.query('SELECT * FROM list_product');
            res.json(supplier[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const supplier = yield databases_1.default.query('Select * from list_product where listid = ?', [id]);
            if (supplier.length > 0) {
                // console.log(user)
                return res.json(supplier[0]);
            }
            res.status(404).json("the list_product doesn't exists");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield databases_1.default.query('INSERT INTO list_product set ?', [req.body]);
            res.json({ text: 'create list_product' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { idp } = req.params;
            yield databases_1.default.query('Update list_product set ? where listid = ? and productid = ?', [req.body, id, idp]);
            res.json({ text: 'list_product update' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { idp } = req.params;
            yield databases_1.default.query('delete from list_product where listid = ? and productid = ?', [id, idp]);
            res.json({ text: 'list_product delete' });
        });
    }
}
const productListController = new ProductListController();
exports.default = productListController;
