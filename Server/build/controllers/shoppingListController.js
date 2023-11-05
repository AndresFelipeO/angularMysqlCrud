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
class ShoppingListController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopping = yield databases_1.default.query('SELECT * FROM shopping_list');
            res.json(shopping[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const shopping = yield databases_1.default.query('Select * from shopping_list where listid = ?', [id]);
            if (shopping.length > 0) {
                // console.log(user)
                return res.json(shopping[0]);
            }
            res.status(404).json("the user doesn't exists");
        });
    }
    listUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const shopping = yield databases_1.default.query('Select * from shopping_list where userid = ?', [id]);
            if (shopping.length > 0) {
                // console.log(user)
                return res.json(shopping[0]);
            }
            res.status(404).json("the user doesn't exists");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield databases_1.default.query('INSERT INTO shopping_list set ?', [req.body]);
            res.json({ text: 'create shopping list' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield databases_1.default.query('Update shopping_list set ? where listid = ?', [req.body, id]);
            res.json({ text: 'List update' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield databases_1.default.query('delete from shopping_list where listid = ?', [id]);
            res.json({ text: 'List delete' });
        });
    }
}
const shoppingListController = new ShoppingListController();
exports.default = shoppingListController;
