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
const product_1 = require("../models/product");
class ProductController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.Product.findAll();
            res.json(product);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield product_1.Product.findOne({ where: { productid: id } });
            if (product) {
                return res.json(product);
            }
            res.status(404).json("the product doesn't exists");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_name, product_price, supplierid } = req.body;
            try {
                // Guardarmos usuario en la base de datos
                yield product_1.Product.create({
                    product_name: product_name,
                    product_price: product_price,
                    supplierid: supplierid
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
            const { product_name, product_price } = req.body;
            try {
                const updatedProduct = yield product_1.Product.update({
                    product_name: product_name,
                    product_price: product_price
                }, {
                    where: { productid: id }, // Condición para encontrar el usuario a actualizar
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
            const id = req.params.id; // Obtén el ID del usuario a eliminar desde la solicitud
            try {
                const deletedProduct = yield product_1.Product.destroy({
                    where: { productid: id }, // Condición para encontrar el usuario a eliminar
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
const productController = new ProductController();
exports.default = productController;
