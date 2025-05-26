import express, { Router } from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import { logSuccess } from '../utils/logs.utils';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}
  

export class Server {

    private readonly app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.routes = routes;
        this.port = port;
        this.publicPath = public_path;
    }



    async start() {

        //* Middlewares
        this.app.use(express.static(this.publicPath) );
        this.app.use(express.json());
        this.app.use(morgan('dev')); // use morgan for logging
        this.app.use(cors()); // use CORS
        this.app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

        // * Routes
        this.app.use('', this.routes);

        // Rote (SPA)<regex to match others routes used by the frontend> 
        this.app.get(/(.*)/, (_: any, res: any) => {
            res.sendFile(path.resolve(__dirname, `../../${this.publicPath}/index.html`));
        });

        this.app.listen(this.port, () => {
            logSuccess(`Server running on port ${this.port}`);
        });

    }

}