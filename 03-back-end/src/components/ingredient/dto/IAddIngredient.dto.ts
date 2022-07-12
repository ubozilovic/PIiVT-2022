import Ajv from "ajv";

const ajv = new Ajv();

export default interface IAddIngredient {
    name: string;
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