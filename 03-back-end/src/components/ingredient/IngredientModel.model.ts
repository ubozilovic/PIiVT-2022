import IModel from "../../common/IModel.interface";

class IngredientModel implements IModel {
    ingredientId: number;
    name: string;  
    ingredient_type: string;
    
    //Fks:
    categoryId: number;
}

export default IngredientModel;

