import IngredientModel from "./IngredientModel.model";
import * as myslq2 from 'mysql2/promise';
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";

class IngredientAdapterOptions implements IAdapterOptions {

}
class IngredientService extends BaseService<IngredientModel, IngredientAdapterOptions> {
    tableName(): string {
       return "ingredient";
    }
    

    protected async adaptToModel(data: any): Promise<IngredientModel> {
        const ingredient: IngredientModel = new IngredientModel();

        ingredient.ingredientId = +data?.ingredient_id;
        ingredient.name = data?.name;
        ingredient.ingredient_type = data?.ingredient_type;
        ingredient.categoryId = data?.category_id;


        return ingredient;
    }

    public async getByCategoryId(categoryId: number): Promise<IngredientModel[]> {
        return new Promise<IngredientModel[]>(
            (resolve, reject) => {
                const sql: string = "SELECT * FROM `ingredient` WHERE category_id = ? ORDER BY `name`;";
                this.db.execute(sql,[categoryId])
                .then(async ([rows]) => {
                    if (rows === undefined) {
                        return resolve([]);
                    }
                    const categories: IngredientModel[] = [];
    
                    for(const row of rows as myslq2.RowDataPacket[]) {
                        categories.push(await this.adaptToModel(row));
                    }
    
                    resolve(categories);
                })
                .catch(error => {
                    reject(error); 
                });
            }
            
        );
    }
}

export default IngredientService;