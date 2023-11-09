import { Request, Response, json } from 'express'

import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

class UserController {

    public async list(req: Request, res: Response) {
        const users = await User.findAll();
        res.json(users);
    }

    public async create(req: Request, res: Response){

        const { user_name, username, user_password } = req.body;
        // Validamos si el usuario ya existe en la base de datos
        const user = await User.findOne({ where: { username: username } });
        if (user) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el nombre ${username}`
            })
        }
        const hashedPassword = await bcrypt.hash(user_password, 10);
        try {
            // Guardarmos usuario en la base de datos
            await User.create({
                user_name: user_name,
                username: username,
                user_password: hashedPassword
            })
            res.json({
                msg: `Usuario ${username} creado exitosamente!`
            })
        } catch (error) {
            res.status(400).json({
                msg: 'Upps ocurrio un error',
                error
            })
        }
    }
    public async update(req: Request, res: Response): Promise<void> {
        const userId = req.params.id; // Obtén el ID del usuario a actualizar desde la solicitud
        const { user_name, username, user_password } = req.body;
        try {
            const updatedUser = await User.update(
                {
                    user_name: user_name, // Nuevos valores para los campos que deseas actualizar
                    username: username,
                },
                {
                    where: { userid: userId }, // Condición para encontrar el usuario a actualizar
                }
            );

            if (updatedUser[0] === 1) {
                // Si updatedUser[0] es igual a 1, significa que se actualizó un registro
                res.json({ message: 'Usuario actualizado con éxito' });
            } else {
                res.json({ message: 'No se encontró el usuario o no se realizó ninguna actualización' });
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ error: 'No se pudo actualizar el usuario' });
        }
    }
    public async delete(req: Request, res: Response) {
        const userId = req.params.id; // Obtén el ID del usuario a eliminar desde la solicitud

        try {
            const deletedUser = await User.destroy({
                where: { userid: userId }, // Condición para encontrar el usuario a eliminar
            });

            if (deletedUser === 1) {
                // Si deletedUser es igual a 1, significa que se eliminó un registro
                res.json({ message: 'Usuario eliminado con éxito' });
            } else {
                res.json({ message: 'No se encontró el usuario o no se realizó ninguna eliminación' });
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ error: 'No se pudo eliminar el usuario' });
        }
    }

    public async loginUser(req: Request, res: Response) {

        try{
            const { username, password } = req.body;

        // Validamos si el usuario existe en la base de datos
        const user: any = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario con el nombre ${username} en la base datos`
            })
        }

        // Validamos password
        const passwordValid = await bcrypt.compare(password, user.user_password)
        if (!passwordValid) {
            return res.status(400).json({
                msg: `Password Incorrecta`
            })
        }
        // Generamos token
        const token = jwt.sign({
            username: username,
            idUser:user.userid
        }, process.env.SECRET_KEY || 'pepito123');

        res.json(token);
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'no se pudo iniciar sesion' });
        }
    
        
    }
}

const indexController = new UserController();
export default indexController;