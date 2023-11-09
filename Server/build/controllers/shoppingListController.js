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
const shopping_list_1 = require("../models/shopping_list");
class ShoppingListController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopping = yield shopping_list_1.Shopping_list.findAll();
            res.json(shopping);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const shopping = yield shopping_list_1.Shopping_list.findOne({ where: { listid: id } });
            if (shopping) {
                return res.json(shopping);
            }
            res.status(404).json("the user doesn't exists");
        });
    }
    listUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { iduser } = req.body;
                const shopping = yield shopping_list_1.Shopping_list.findAll({ where: { userid: iduser } });
                if (shopping) {
                    return res.json(shopping);
                }
                res.status(404).json("the user doesn't exists");
            }
            catch (error) {
                res.status(400).json({
                    msg: 'Upps ocurrio un error',
                    error
                });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userid, list_name } = req.body;
            try {
                // Guardarmos usuario en la base de datos
                yield shopping_list_1.Shopping_list.create({
                    list_name: list_name,
                    userid: userid,
                });
                res.json({
                    msg: `se creo la lista exitosamente!`
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
            const { list_name } = req.body;
            try {
                const updatedList = yield shopping_list_1.Shopping_list.update({
                    list_name: list_name // Nuevos valores para los campos que deseas actualizar
                }, {
                    where: { listid: id }, // Condición para encontrar el usuario a actualizar
                });
                if (updatedList[0] === 1) {
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
                const deletedshopping = yield shopping_list_1.Shopping_list.destroy({
                    where: { userid: id }, // Condición para encontrar el usuario a eliminar
                });
                if (deletedshopping === 1) {
                    // Si deletedUser es igual a 1, significa que se eliminó un registro
                    res.json({ message: 'shopping eliminado con éxito' });
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
const shoppingListController = new ShoppingListController();
exports.default = shoppingListController;
