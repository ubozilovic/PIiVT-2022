import Ajv from "ajv";

const ajv = new Ajv();

export default interface IAddCategory {
    name: string;
}

interface IAddCategoryServiceDto {
    name: string;
    categoryId: number;  
    ingredient_type: string;
}

const AddCategoryValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 3,
            maxLength: 32,
        },
    },
    required: [
        "name",
    ],
    additionalProperties: false,
});

export { AddCategoryValidator, IAddCategoryServiceDto };