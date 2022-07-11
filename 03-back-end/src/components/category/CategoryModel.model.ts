import IngredientModel from '../ingredient/IngredientModel.model';
class CategoryModel {
    categoryId: number;
    name: string;   

    ingredients?: IngredientModel[];
}

export default CategoryModel;

