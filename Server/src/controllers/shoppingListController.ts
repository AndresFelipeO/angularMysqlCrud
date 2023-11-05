import {Request, Response} from 'express'

import pool from '../databases'

class ShoppingListController{
    
    public async list (req:Request,res:Response){
        const shopping = await pool.query('SELECT * FROM shopping_list');
        res.json(shopping[0]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id}=req.params;
        const shopping=await pool.query('Select * from shopping_list where listid = ?',[id]);
        if(shopping.length>0){
           // console.log(user)
            return res.json(shopping[0])
        } 
        res.status(404).json("the user doesn't exists")
    }

    public async listUser(req:Request,res:Response):Promise<any>{
        const {id}=req.params;
        const shopping=await pool.query('Select * from shopping_list where userid = ?',[id]);
        if(shopping.length>0){
           // console.log(user)
            return res.json(shopping[0])
        } 
        res.status(404).json("the user doesn't exists")
    }
    

    public async create(req:Request,res:Response): Promise<void>{
        await pool.query('INSERT INTO shopping_list set ?',[req.body])
        res.json({text:'create shopping list'})
    }
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await pool.query('Update shopping_list set ? where listid = ?',[req.body,id]);
        res.json({text:'List update'})
    }
    public async delete(req:Request,res:Response){
        const {id}=req.params;
        await pool.query('delete from shopping_list where listid = ?',[id]);
        res.json({text:'List delete'})
    }
}

const shoppingListController= new ShoppingListController();
export default shoppingListController;