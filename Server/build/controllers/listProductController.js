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
Object.defineProperty(exports, "__esModule", { value: true });
const list_product_1 = require("../models/list_product");
class ProductListController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const list_product = yield list_product_1.List_product.findAll({ where: { listid: id } });
            res.json(list_product);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const list_product = yield list_product_1.List_product.findOne({ where: { productid: id } });
            if (list_product) {
                return res.json(list_product);
            }
            res.status(404).json("the product doesn't exists");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req.body;
            const { listid, productid, list_product_state } = body;
            try {
                // Guardarmos usuario en la base de datos
                yield list_product_1.List_product.create({
                    listid: listid,
                    productid: productid,
                    list_product_state: list_product_state
                });
                res.json({
                    msg: `se creo exitosamente!`
                });
            }
            catch (error) {
                res.status(400).json({
                    msg: 'Upps ocurrio un error',
                    error
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { body } = req.body;
            const { list_product_state } = body;
            console.log("ntro");
            try {
                const updatedProduct = yield list_product_1.List_product.update({
                    list_product_state: list_product_state
                }, {
                    where: { id: id }, // Condición para encontrar el usuario a actualizar
                });
                if (updatedProduct[0] === 1) {
                    // Si updatedUser[0] es igual a 1, significa que se actualizó un registro
                    res.json({ message: 'actualizado con éxito' });
                }
                else {
                    res.json({ message: 'No se encontró o no se realizó ninguna actualización' });
                }
            }
            catch (error) {
                console.error('Error al actualizar:', error);
                res.status(500).json({ error: 'No se pudo actualizar' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedProduct = yield list_product_1.List_product.destroy({
                    where: { id: id }, // Condición para encontrar el usuario a eliminar
                });
                if (deletedProduct === 1) {
                    // Si deletedUser es igual a 1, significa que se eliminó un registro
                    res.json({ message: 'eliminado con éxito' });
                }
                else {
                    res.json({ message: 'No se encontró o no se realizó ninguna eliminación' });
                }
            }
            catch (error) {
                console.error('Error al eliminar:', error);
                res.status(500).json({ error: 'No se pudo eliminar ' });
            }
        });
    }
}
const productListController = new ProductListController();
exports.default = productListController;
