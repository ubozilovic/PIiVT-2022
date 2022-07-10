import CategoryController from "./CategoryController.controller";
import CategoryService from "./CategoryService.service";
import * as express from "express";
import IApplicationRecources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";

class CategoryRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationRecources){
        const categoryService: CategoryService = new CategoryService(resources.databaseConnection);
        const categoryController: CategoryController = new CategoryController(categoryService);

        application.get("/api/category", categoryController.getAll.bind(categoryController));
        application.get("/api/category/:id", categoryController.getById.bind(categoryController));
    }
}

export default CategoryRouter;