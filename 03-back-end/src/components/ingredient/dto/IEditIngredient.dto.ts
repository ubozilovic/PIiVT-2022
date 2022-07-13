import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export interface IEditIngredientDto {
    name: string; 
    ingredient_type: string;
}
export default interface IEditIngredient extends IServiceData {
    name: string;
    ingredient_type: string;
}


const EditIngredientValidator = ajv.compile({
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

export { EditIngredientValidator };