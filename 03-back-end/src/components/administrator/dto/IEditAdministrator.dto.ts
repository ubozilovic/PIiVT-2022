import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IEditAdministrator extends IServiceData {
    password_hash?: string;
    is_active?: number;
}

export interface IEditAdministratorDto {
    password?: string;
    isActive?: boolean;
}

const EditAdministratorValidator = ajv.compile({
    type: "object",
    properties: {
        password: {
            type: "string",
            minLength: 5,
            maxLength: 64,
        },
        
    },
    required: [
        
    ],
    additionalProperties: false,
});

export { EditAdministratorValidator };