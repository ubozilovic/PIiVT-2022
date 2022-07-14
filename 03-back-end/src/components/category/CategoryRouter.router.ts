import CategoryController from "./CategoryController.controller";
import * as express from "express";
import IApplicationRecources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";


class CategoryRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationRecources){
        
       
        const categoryController: CategoryController = new CategoryController(resources.services);

        application.get("/api/category", categoryController.getAll.bind(categoryController));
        application.get("/api/category/:id", categoryController.getById.bind(categoryController));
        application.post("/api/category", categoryController.add.bind(categoryController));
        application.put("/api/category/:cid", categoryController.edit.bind(categoryController));
        application.post("/api/category/:cid/ingredient", categoryController.addIngredient.bind(categoryController));
        application.put("/api/category/:cid/ingredient/:iid", categoryController.editIngredient.bind(categoryController));
        application.get("/api/category/:cid/item",               categoryController.getAllItemsByCategoryId.bind(categoryController));
        application.get("/api/category/:cid/item/:iid",          categoryController.getItemById.bind(categoryController));
        
    }
}

export default CategoryRouter;