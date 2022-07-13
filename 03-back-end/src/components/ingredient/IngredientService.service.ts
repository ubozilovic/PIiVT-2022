import IngredientModel from "./IngredientModel.model";
import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import IAddIngredient from "./dto/IAddIngredient.dto";
import IEditIngredient from './dto/IEditIngredient.dto';

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

    public async getAllByCategoryId(categoryId: number, options: IngredientAdapterOptions): Promise<IngredientModel[]> {
        return this.getAllByFieldNameAnValue('category_id', categoryId, options );
    }

    public async add(data: IAddIngredient): Promise<IngredientModel> {
        return this.baseAdd(data, {});
    }

    public async editById(ingredientId: number, data: IEditIngredient): Promise<IngredientModel> {
        return this.baseEditById(ingredientId, data, {});
    }
}

export default IngredientService;