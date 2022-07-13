import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export interface IAddIngredientDto {
    name: string;
    
    ingredient_type: string;
}
export default interface IAddIngredient extends IServiceData {
    name: string;
    category_id: number;
    ingredient_type: string;
}


const AddIngredientValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 32,
        },
        ingredient_type: {
            type: "string",
            minLength: 2,
            maxLength: 32,
        },
         
    },
    required: [
        "name",
        "ingredient_type",
        
    ],
    additionalProperties: false,
});

export { AddIngredientValidator };