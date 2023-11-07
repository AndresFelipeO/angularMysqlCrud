import {Request, Response} from 'express'
import { Product } from '../models/product';

class ProductController{
    
    public async list (req:Request,res:Response){
        const product =  await Product.findAll()
        res.json(product);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id}=req.params;
        const product=await Product.findOne({where:{productid:id}});
        if(product){
            return res.json(product)
        } 
        res.status(404).json("the product doesn't exists")
    }

    public async create(req:Request,res:Response): Promise<void>{
        const { product_name,product_price ,supplierid} = req.body;
        
        try {
            // Guardarmos usuario en la base de datos
            await Product.create({
                product_name: product_name,
                product_price: product_price,
                supplierid: supplierid 
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
        const { product_name,product_price} = req.body;
        try {
            const updatedProduct = await Product.update(
                {
                    product_name: product_name,
                    product_price: product_price
                },
                {
                    where: { productid: id }, // Condición para encontrar el usuario a actualizar
                }
            );

            if (updatedProduct[0] === 1) {
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
            const deletedProduct = await Product.destroy({
                where: { productid: id }, // Condición para encontrar el usuario a eliminar
            });

            if (deletedProduct === 1) {
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

const productController= new ProductController();
export default productController;