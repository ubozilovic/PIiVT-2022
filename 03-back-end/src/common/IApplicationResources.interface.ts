import * as mysql2 from "mysql2/promise";
import CategoryService from "../components/category/CategoryService.service";
import IngredientService from "../components/ingredient/IngredientService.service";


export interface IServices {
    category: CategoryService;
    ingredient: IngredientService;
}

export default interface IApplicationRecources {
    databaseConnection: mysql2.Connection;
    services: IServices;
}

