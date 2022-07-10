import IConfig from './common/IConfig.interface';
import CategoryRouter from './components/category/CategoryRouter.router';
const DevConfig: IConfig = {
    server: {
        port: 10000,
      static: {
        index: false,
        dotfiles: "deny",
        cacheControl: true,
        etag: true,
        maxAge: 1000 * 60 * 60 * 24,
        path: "./static",
        route: "/assets"


      }
    },
    database: {
        host: 'localhost',
        port: 3306,
        user: 'aplikacija',
        password: 'aplikacija',
        database: 'piivt_app',
        charset: 'utf8',
        timezone: '+01:00',
        supportBigNumbers: true,
    },
    routers: [
      new CategoryRouter(),
    ]
};



export { DevConfig };