import * as express from "express";
import * as cors from "cors";
import IConfig from "./common/IConfig.interface";
import { DevConfig } from "./configs";
import CategoryRouter from "./components/category/CategoryRouter.router";
import IApplicationRecources from "./common/IApplicationResources.interface";
import * as myslq2 from "mysql2/promise";
import CategoryService from "./components/category/CategoryService.service";
import IngredientService from "./components/ingredient/IngredientService.service";
import AdministratorService from "./components/administrator/AdministratorService.service";

async function main() {
    const config: IConfig = DevConfig;

    const db = await myslq2.createConnection({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        charset: config.database.charset,
        timezone: config.database.timezone,
        supportBigNumbers: config.database.supportBigNumbers,
    });

const applicationResources: IApplicationRecources = {
    databaseConnection: db,
    services: {
        category: new CategoryService(db),
        ingredient: new IngredientService(db),
        administrator: new AdministratorService(db),
    }
};

const application: express.Application = express();

application.use(cors());
application.use(express.json());

application.use(config.server.static.route, express.static(config.server.static.path, {
    index: config.server.static.index,
    dotfiles: config.server.static.dotfiles,
    cacheControl: config.server.static.cacheControl,
    etag: config.server.static.etag,
    maxAge: config.server.static.maxAge
}));

for(const router of config.routers) {
    router.setupRoutes(application, applicationResources);
}


application.use( (req, res) => {
    res.sendStatus(404);
} );

application.listen(config.server.port);

}
process.on('uncaughtException', error => {
    console.error('ERROR', error);
});
main();