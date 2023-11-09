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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            // Accede al ID del usuario desde el token decodificado
            req.body = { body: req.body, iduser: decodedToken.idUser };
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
});
exports.default = validateToken;
