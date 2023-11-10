import {Router} from 'express';
import productController from '../controllers/productController'
import validateToken from './validate-token';

class ProductRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        //ruta inicial
        this.router.get('/',validateToken,productController.list)
        this.router.get('/:id',validateToken,productController.getOne)
        this.router.post('/',validateToken,productController.create)
        this.router.put('/:id',validateToken,productController.update)
        this.router.delete('/:id',validateToken,productController.delete)
    }
}

const productRoutes=new ProductRoutes()
export default productRoutes.router;