import express,{Application, application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import shoppingListRoutes from './routes/shoppingListRoutes';
import supplierRoutes from './routes/supplierRoutes';
import productRoutes from './routes/productRoutes';
import listProductRoute from './routes/listProductRoute';

class Server{
    public app:Application;
    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes():void{
        this.app.use(indexRoutes);
        this.app.use('/api/users',userRoutes)
        this.app.use('/api/product',productRoutes);
        this.app.use('/api/shoppingList',shoppingListRoutes);
        this.app.use('/api/supplier',supplierRoutes);
        this.app.use('/api/listProduct',listProductRoute);
    }
    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('server port ',this.app.get('port'));
        });
    }
}

const server=new Server();
server.start();