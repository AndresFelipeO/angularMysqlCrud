import { Request, Response } from 'express'
import { List_product } from '../models/list_product';

class ProductListController {

  public async list(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id)
    const list_product = await List_product.findAll({ where: { listid: id } });
    res.json(list_product);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const list_product = await List_product.findOne({ where: { productid: id } });
    if (list_product) {
      return res.json(list_product)
    }
    res.status(404).json("the product doesn't exists")

  }

  public async create(req: Request, res: Response): Promise<void> {
    const { listid, productid, list_product_state } = req.body;

    try {
      // Guardarmos usuario en la base de datos
      await List_product.create({
        listid: listid,
        productid: productid,
        list_product_state: list_product_state

      })
      res.json({
        msg: `se creo exitosamente!`
      })
    } catch (error) {
      res.status(400).json({
        msg: 'Upps ocurrio un error',
        error
      })
    }
  }
  public async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const { list_product_state } = req.body;
    try {
      const updatedProduct = await List_product.update(
        {
          list_product_state: list_product_state
        },
        {
          where: { listid: id }, // Condición para encontrar el usuario a actualizar
        }
      );

      if (updatedProduct[0] === 1) {
        // Si updatedUser[0] es igual a 1, significa que se actualizó un registro
        res.json({ message: 'actualizado con éxito' });
      } else {
        res.json({ message: 'No se encontró o no se realizó ninguna actualización' });
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      res.status(500).json({ error: 'No se pudo actualizar' });
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { idp } = req.params;

    try {
      const deletedProduct = await List_product.destroy({
        where: { listid: id,productid:idp }, // Condición para encontrar el usuario a eliminar
      });

      if (deletedProduct === 1) {
        // Si deletedUser es igual a 1, significa que se eliminó un registro
        res.json({ message: 'eliminado con éxito' });
      } else {
        res.json({ message: 'No se encontró o no se realizó ninguna eliminación' });
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      res.status(500).json({ error: 'No se pudo eliminar ' });
    }
  }
}

const productListController = new ProductListController();
export default productListController;