import {Request, Response} from 'express'

import pool from '../databases'

class UserController{
    
    public async list (req:Request,res:Response){
        const users = await pool.query('SELECT userid, user_name, username FROM user');
        
        res.json(users[0]);
    }

    public async getOne(req:Request,res:Response):Promise<any>{
        const {id}=req.params;
        const user=await pool.query('Select userid, user_name, username from user where userid = ?',[id]);
        if(user.length>0){
           // console.log(user)
            return res.json(user[0])
        } 
        res.status(404).json("the user doesn't exists")
    }

    public async create(req:Request,res:Response): Promise<void>{
        await pool.query('INSERT INTO user set ?',[req.body])
        res.json({text:'creando un user'})
    }
    public async update(req:Request,res:Response):Promise<void>{
        const {id}=req.params;
        await pool.query('Update user set ? where userid = ?',[req.body,id]);
        res.json({text:'User update'})
    }
    public async delete(req:Request,res:Response){
        const {id}=req.params;
        await pool.query('delete from user where userid = ?',[id]);
        res.json({text:'User delete'})
    }
}

const indexController= new UserController();
export default indexController;