import {Router} from 'express';
import supplierController from '../controllers/supplierController'

class SupplierRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        //ruta inicial
        this.router.get('/',supplierController.list)
        this.router.get('/:id',supplierController.getOne)
        this.router.post('/',supplierController.create)
        this.router.put('/:id',supplierController.update)
        this.router.delete('/:id',supplierController.delete)
    }
}

const supplierRoutes=new SupplierRoutes()
export default supplierRoutes.router;