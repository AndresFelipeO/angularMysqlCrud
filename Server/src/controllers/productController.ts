import {Request, Response} from 'express'

import pool from '../databases'

class ProductController{
    
    public async list (req:Request,res:Response){
        const supplier = await pool.query('SELECT * FROM product');
        res.json(supplier[0]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id}=req.params;
        const supplier=await pool.query('Select * from product where productid = ?',[id]);
        if(supplier.length>0){
           // console.log(user)
            return res.json(supplier[0])
        } 
        res.status(404).json("the product doesn't exists")
    }

    public async create(req:Request,res:Response): Promise<void>{
        await pool.query('INSERT INTO product set ?',[req.body])
        res.json({text:'create product list'})
    }
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await pool.query('Update product set ? where productid = ?',[req.body,id]);
        res.json({text:'product update'})
    }
    public async delete(req:Request,res:Response){
        const {id}=req.params;
        await pool.query('delete from product where productid = ?',[id]);
        res.json({text:'product delete'})
    }
}

const productController= new ProductController();
export default productController;