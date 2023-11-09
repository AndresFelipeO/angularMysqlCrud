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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.User.findAll();
            res.json(users);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_name, username, user_password } = req.body;
            // Validamos si el usuario ya existe en la base de datos
            const user = yield user_1.User.findOne({ where: { username: username } });
            if (user) {
                return res.status(400).json({
                    msg: `Ya existe un usuario con el nombre ${username}`
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(user_password, 10);
            try {
                // Guardarmos usuario en la base de datos
                yield user_1.User.create({
                    user_name: user_name,
                    username: username,
                    user_password: hashedPassword
                });
                res.json({
                    msg: `Usuario ${username} creado exitosamente!`
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
            const userId = req.params.id; // Obtén el ID del usuario a actualizar desde la solicitud
            const { user_name, username, user_password } = req.body;
            try {
                const updatedUser = yield user_1.User.update({
                    user_name: user_name,
                    username: username,
                }, {
                    where: { userid: userId }, // Condición para encontrar el usuario a actualizar
                });
                if (updatedUser[0] === 1) {
                    // Si updatedUser[0] es igual a 1, significa que se actualizó un registro
                    res.json({ message: 'Usuario actualizado con éxito' });
                }
                else {
                    res.json({ message: 'No se encontró el usuario o no se realizó ninguna actualización' });
                }
            }
            catch (error) {
                console.error('Error al actualizar el usuario:', error);
                res.status(500).json({ error: 'No se pudo actualizar el usuario' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id; // Obtén el ID del usuario a eliminar desde la solicitud
            try {
                const deletedUser = yield user_1.User.destroy({
                    where: { userid: userId }, // Condición para encontrar el usuario a eliminar
                });
                if (deletedUser === 1) {
                    // Si deletedUser es igual a 1, significa que se eliminó un registro
                    res.json({ message: 'Usuario eliminado con éxito' });
                }
                else {
                    res.json({ message: 'No se encontró el usuario o no se realizó ninguna eliminación' });
                }
            }
            catch (error) {
                console.error('Error al eliminar el usuario:', error);
                res.status(500).json({ error: 'No se pudo eliminar el usuario' });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                // Validamos si el usuario existe en la base de datos
                const user = yield user_1.User.findOne({ where: { username: username } });
                if (!user) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el nombre ${username} en la base datos`
                    });
                }
                // Validamos password
                const passwordValid = yield bcrypt_1.default.compare(password, user.user_password);
                if (!passwordValid) {
                    return res.status(400).json({
                        msg: `Password Incorrecta`
                    });
                }
                // Generamos token
                const token = jsonwebtoken_1.default.sign({
                    username: username,
                    idUser: user.userid
                }, process.env.SECRET_KEY || 'pepito123');
                res.json(token);
            }
            catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'no se pudo iniciar sesion' });
            }
        });
    }
}
const indexController = new UserController();
exports.default = indexController;
