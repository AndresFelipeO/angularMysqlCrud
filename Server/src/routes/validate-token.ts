import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']


    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            const decodedToken: any = jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');

           const {id}=req.params;
            const user=await User.findOne({where: {
                userid: id, // Filtra por el ID del usuario autenticado
                username: decodedToken.username, // Filtra por el nombre de usuario del usuario autenticado
              }});
            if(user){
                next();
            } 
           else {
                res.status(403).json({ msg: 'Acceso denegado: No puedes ver las listas de otros usuarios' });
              }
        } catch (error) {
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
