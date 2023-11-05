import {Router} from 'express';
import shoppingListController from '../controllers/shoppingListController'

class ShoppingListRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        //ruta inicial
        this.router.get('/',shoppingListController.list)
        this.router.get('/:id',shoppingListController.getOne)
        this.router.get('/user/:id',shoppingListController.listUser)
        this.router.post('/',shoppingListController.create)
        this.router.put('/:id',shoppingListController.update)
        this.router.delete('/:id',shoppingListController.delete)
    }
}

const shoppingListRoutes=new ShoppingListRoutes()
export default shoppingListRoutes.router;