import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']


    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            const decodedToken: any = jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
             // Accede al ID del usuario desde el token decodificado
            req.body={body:req.body,iduser:decodedToken.idUser}
            next();
        } 
        catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            })
        }

    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
}

export default validateToken;
