import { Request, Response } from 'express'
import { Shopping_list } from '../models/shopping_list';

class ShoppingListController {

    public async list(req: Request, res: Response) {
        const shopping = await Shopping_list.findAll()
        res.json(shopping);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const shopping = await Shopping_list.findOne({ where: { listid: id } });
        if (shopping) {
            return res.json(shopping)
        }
        res.status(404).json("the user doesn't exists")
    }

    public async listUser(req: Request, res: Response): Promise<any> {
        try {
            const { iduser } = req.body;
            const shopping = await Shopping_list.findAll({ where: { userid: iduser } });
            if (shopping) {
                return res.json(shopping)
            }
            res.status(404).json("the user doesn't exists")
        } catch (error) {
            res.status(400).json({
                msg: 'Upps ocurrio un error', 
                error
            })
        }
    }


    public async create(req: Request, res: Response): Promise<void> {
        const { userid, list_name } = req.body;
        try {
            // Guardarmos usuario en la base de datos
            await Shopping_list.create({
                list_name: list_name,
                userid: userid,
            })
            res.json({
                msg: `se creo la lista exitosamente!`
            })
        } catch (error) {
            res.status(400).json({
                msg: 'Upps ocurrio un error',
                error
            })
        }
    }
    public async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const { list_name } = req.body;
        try {
            const updatedList = await Shopping_list.update(
                {
                    list_name: list_name // Nuevos valores para los campos que deseas actualizar
                },
                {
                    where: { listid: id }, // Condición para encontrar el usuario a actualizar
                }
            );

            if (updatedList[0] === 1) {
                // Si updatedUser[0] es igual a 1, significa que se actualizó un registro
                res.json({ message: 'actualizado con éxito' });
            } else {
                res.json({ message: 'No se encontró o no se realizó ninguna actualización' });
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            res.status(500).json({ error: 'No se pudo actualizar' });
        }
    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id; // Obtén el ID del usuario a eliminar desde la solicitud

        try {
            const deletedshopping = await Shopping_list.destroy({
                where: { userid: id }, // Condición para encontrar el usuario a eliminar
            });

            if (deletedshopping === 1) {
                // Si deletedUser es igual a 1, significa que se eliminó un registro
                res.json({ message: 'shopping eliminado con éxito' });
            } else {
                res.json({ message: 'No se encontró o no se realizó ninguna eliminación' });
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            res.status(500).json({ error: 'No se pudo eliminar ' });
        }
    }
}

const shoppingListController = new ShoppingListController();
export default shoppingListController;