import {Request, Response} from 'express'

import pool from '../databases'

class ProductListController{
    
    public async list (req:Request,res:Response){
        const supplier = await pool.query('SELECT * FROM list_product');
        res.json(supplier[0]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id}=req.params;
        const supplier=await pool.query('Select * from list_product where listid = ?',[id]);
        if(supplier.length>0){
           // console.log(user)
            return res.json(supplier[0])
        } 
        res.status(404).json("the list_product doesn't exists")
    }

    public async create(req:Request,res:Response): Promise<void>{
        await pool.query('INSERT INTO list_product set ?',[req.body])
        res.json({text:'create list_product'})
    }
    public async update(req:Request,res:Response):Promise<void>{ 
        const {id}=req.params;
        const {idp}=req.params;
        await pool.query('Update list_product set ? where listid = ? and productid = ?',[req.body,id,idp]);
        res.json({text:'list_product update'})
    }
    public async delete(req:Request,res:Response){
        const {id}=req.params;
        const {idp}=req.params;
        await pool.query('delete from list_product where listid = ? and productid = ?',[id,idp]);
        res.json({text:'list_product delete'})
    }
}

const productListController= new ProductListController();
export default productListController;