import {Request, Response} from 'express'

import pool from '../databases'

class SupplierController{
    
    public async list (req:Request,res:Response){
        const supplier = await pool.query('SELECT * FROM supplier');
        res.json(supplier[0]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id}=req.params;
        const supplier=await pool.query('Select * from supplier where supplierid = ?',[id]);
        if(supplier.length>0){
           // console.log(user)
            return res.json(supplier[0])
        } 
        res.status(404).json("the supplier doesn't exists")
    }

    public async create(req:Request,res:Response): Promise<void>{
        await pool.query('INSERT INTO supplier set ?',[req.body])
        res.json({text:'create supplier list'})
    }
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await pool.query('Update supplier set ? where supplierid = ?',[req.body,id]);
        res.json({text:'supplier update'})
    }
    public async delete(req:Request,res:Response){
        const {id}=req.params;
        await pool.query('delete from supplier where supplierid = ?',[id]);
        res.json({text:'supplier delete'})
    }
}

const supplierController= new SupplierController();
export default supplierController;