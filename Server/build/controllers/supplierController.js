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
class SupplierController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield databases_1.default.query('SELECT * FROM supplier');
            res.json(supplier[0]);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const supplier = yield databases_1.default.query('Select * from supplier where supplierid = ?', [id]);
            if (supplier.length > 0) {
                // console.log(user)
                return res.json(supplier[0]);
            }
            res.status(404).json("the supplier doesn't exists");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield databases_1.default.query('INSERT INTO supplier set ?', [req.body]);
            res.json({ text: 'create supplier list' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield databases_1.default.query('Update supplier set ? where supplierid = ?', [req.body, id]);
            res.json({ text: 'supplier update' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield databases_1.default.query('delete from supplier where supplierid = ?', [id]);
            res.json({ text: 'supplier delete' });
        });
    }
}
const supplierController = new SupplierController();
exports.default = supplierController;
