import { Request, Response } from "express";
import CategoryService from './CategoryService.service';
class CategoryController {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService){
        this.categoryService = categoryService;
    }

    async getAll(req: Request, res: Response) {
       this.categoryService.getAll()
       .then(result => {
        res.send(result);
       })
       .catch(error => {
            res.status(500).send(error?.message);
       });
    }
    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;
       
        this.categoryService.getById(id)
            .then(result => {
                if( result === null) {
                    return res.sendStatus(404);
                }
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });  
    }
}

export default CategoryController;