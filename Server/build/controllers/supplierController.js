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
const supplier_1 = require("../models/supplier");
class SupplierController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield supplier_1.Supplier.findAll();
            res.json(supplier);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const supplier = yield supplier_1.Supplier.findOne({ where: { supplierid: id } });
            if (supplier) {
                return res.json(supplier);
            }
            res.status(404).json("the Supplier doesn't exists");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { supplier_name } = req.body;
            try {
                // Guardarmos usuario en la base de datos
                yield supplier_1.Supplier.create({
                    supplier_name: supplier_name,
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
            const { supplier_name } = req.body;
            try {
                const updatedSupplier = yield supplier_1.Supplier.update({
                    supplier_name: supplier_name // Nuevos valores para los campos que deseas actualizar
                }, {
                    where: { supplierid: id }, // Condición para encontrar el usuario a actualizar
                });
                if (updatedSupplier[0] === 1) {
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
                const deletedSupplier = yield supplier_1.Supplier.destroy({
                    where: { supplierid: id }, // Condición para encontrar el usuario a eliminar
                });
                if (deletedSupplier === 1) {
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
const supplierController = new SupplierController();
exports.default = supplierController;
