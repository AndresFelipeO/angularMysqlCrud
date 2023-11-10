import {Router} from 'express';
import supplierController from '../controllers/supplierController'
import validateToken from './validate-token';

class SupplierRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        //ruta inicial
        this.router.get('/',validateToken,supplierController.list)
        this.router.get('/:id',validateToken,supplierController.getOne)
        this.router.post('/',validateToken,supplierController.create)
        this.router.put('/:id',validateToken,supplierController.update)
        this.router.delete('/:id',validateToken,supplierController.delete)
    }
}

const supplierRoutes=new SupplierRoutes()
export default supplierRoutes.router;