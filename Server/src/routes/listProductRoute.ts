import {Router} from 'express';
import listProductController from '../controllers/listProductController'
import validateToken from './validate-token';

class ListProductControllerRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    } 
    config():void{
        //ruta inicial
        this.router.get('/:id',validateToken,listProductController.list)
        this.router.post('/',validateToken,listProductController.create)
        this.router.put('/:id',validateToken,listProductController.update)
        this.router.delete('/:id',validateToken,listProductController.delete)
    }
}

const listProductControllerRoutes=new ListProductControllerRoutes()
export default listProductControllerRoutes.router;