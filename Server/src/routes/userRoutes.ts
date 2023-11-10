import {Router} from 'express';
import userController from '../controllers/userController'

class UserRoutes{
    public router:Router=Router();
    constructor(){
        this.config();
    }
    config():void{
        //ruta inicial
        //this.router.get('/',userController.list)
        this.router.post('/login',userController.loginUser);
       // this.router.post('/',userController.create)
        //this.router.put('/:id',userController.update)
        //this.router.delete('/:id',userController.delete)

    }
}

const userRoutes=new UserRoutes()
export default userRoutes.router;