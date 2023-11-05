import {Request, Response, text} from 'express'

class IndexController{
    public index (req:Request,res:Response){
        res.json({"Api":"/api/users"})
    }
}

export const indexController= new IndexController();