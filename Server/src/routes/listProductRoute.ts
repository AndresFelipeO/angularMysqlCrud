import {Router} from 'express';
import listProductController from '../controllers/listProductController'

class ListProductControllerRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        //ruta inicial
        this.router.get('/',listProductController.list)
        this.router.get('/:id',listProductController.getOne)
        this.router.post('/',listProductController.create)
        this.router.put('/:id/:idp',listProductController.update)
        this.router.delete('/:id/:idp',listProductController.delete)
    }
}

const listProductControllerRoutes=new ListProductControllerRoutes()
export default listProductControllerRoutes.router;