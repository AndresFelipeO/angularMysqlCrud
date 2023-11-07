import {Request, Response} from 'express'

import { Supplier } from '../models/supplier';

class SupplierController{
    
    public async list (req:Request,res:Response){
        const supplier = await Supplier.findAll()
        res.json(supplier);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id}=req.params;
        const supplier=await Supplier.findOne({where:{supplierid:id}});
        if(supplier){
            return res.json(supplier)
        } 
        res.status(404).json("the Supplier doesn't exists")
    }

    public async create(req:Request,res:Response): Promise<void>{
        const { supplier_name } = req.body;
        try {
            // Guardarmos usuario en la base de datos
            await Supplier.create({
                supplier_name: supplier_name,
            })
            res.json({
                msg: `se creo exitosamente!`
            })
        } catch (error) {
            res.status(400).json({
                msg: 'Upps ocurrio un error',
                error
            })
        }
    }
    public async update(req:Request,res:Response):Promise<void>{
        const id = req.params.id; 
        const { supplier_name} = req.body;
        try {
            const updatedSupplier = await Supplier.update(
                {
                    supplier_name: supplier_name // Nuevos valores para los campos que deseas actualizar
                },
                {
                    where: { supplierid: id }, // Condición para encontrar el usuario a actualizar
                }
            );

            if (updatedSupplier[0] === 1) {
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
    public async delete(req:Request,res:Response){
        const id = req.params.id; // Obtén el ID del usuario a eliminar desde la solicitud

        try {
            const deletedSupplier = await Supplier.destroy({
                where: { supplierid: id }, // Condición para encontrar el usuario a eliminar
            });

            if (deletedSupplier === 1) {
                // Si deletedUser es igual a 1, significa que se eliminó un registro
                res.json({ message: 'eliminado con éxito' });
            } else {
                res.json({ message: 'No se encontró o no se realizó ninguna eliminación' });
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            res.status(500).json({ error: 'No se pudo eliminar ' });
        }
    }
}

const supplierController= new SupplierController();
export default supplierController;