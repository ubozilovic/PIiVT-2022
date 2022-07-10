import * as mysql2 from "mysql2/promise";

export default interface IApplicationRecources {
    databaseConnection: mysql2.Connection;
}