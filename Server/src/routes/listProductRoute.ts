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
        this.router.get('/product/:id',listProductController.getOne)
        this.router.post('/',listProductController.create)
        this.router.put('/:id/:idp',listProductController.update)
        this.router.delete('/:id/:idp',listProductController.delete)
    }
}

const listProductControllerRoutes=new ListProductControllerRoutes()
export default listProductControllerRoutes.router;