import {Router} from 'express';
import shoppingListController from '../controllers/shoppingListController'
import validateToken from './validate-token';

class ShoppingListRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        //ruta inicial
        this.router.get('/',validateToken,shoppingListController.listUser)
        this.router.get('/:id',validateToken,shoppingListController.getOne)
        //this.router.get('/user/:id',validateToken,shoppingListController.listUser)
        this.router.post('/',validateToken,shoppingListController.create)
        this.router.put('/:id',validateToken,shoppingListController.update)
        this.router.delete('/:id',validateToken,shoppingListController.delete)
    }
}

const shoppingListRoutes=new ShoppingListRoutes()
export default shoppingListRoutes.router;