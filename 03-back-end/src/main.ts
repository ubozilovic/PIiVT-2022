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
import SizeService from "./components/size/SizeService.service";
import ItemService from "./components/item/ItemService.service";
import PhotoService from "./components/photo/PhotoService.service";
import fileUpload = require("express-fileupload");

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
            category: null,
            ingredient: null,
            administrator: null,
            size: null,
            item: null,
            photo: null,
            
        }
    };

    applicationResources.services.category      = new CategoryService(applicationResources);
    applicationResources.services.ingredient    = new IngredientService(applicationResources);
    applicationResources.services.administrator = new AdministratorService(applicationResources);
    applicationResources.services.size          = new SizeService(applicationResources);
    applicationResources.services.item          = new ItemService(applicationResources);
    applicationResources.services.photo         = new PhotoService(applicationResources);

const application: express.Application = express();


application.use(cors());

application.use(express.urlencoded({extended: true, }));
application.use(fileUpload({
    limits: {
        files: config.fileUploads.maxFiles,
        fileSize: config.fileUploads.maxFileSize,
    },
    abortOnLimit: true,

        useTempFiles: true,
        tempFileDir: config.fileUploads.temporaryFileDirecotry,
        createParentPath: true,
        safeFileNames: true,
        preserveExtension: true,
}));
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