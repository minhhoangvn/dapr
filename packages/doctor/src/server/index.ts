import * as express from 'express';
import { Server } from 'http';
import { ExpressOptions } from '@minhhoang/base';
import * as bodyParser from 'body-parser';
import routes from '@/routes';
export class Doctor {
    public isRun: boolean;
    private expressServerPort: number;
    private expressServer: express.Application;
    private expressApp: Server;
    private expressOptions: ExpressOptions;

    constructor(port: number = 8881, options: ExpressOptions = { keepAliveTimeout: 100, timeout: 100 }) {
        this.expressServerPort = port;
        this.expressOptions = options;
    }

    public startServer(): Server {
        this.expressServer = express();
        this.expressServer.use(bodyParser.json());
        this.expressServer.use(bodyParser.urlencoded({ extended: false }));
        this.expressServer.get('/ping', (req, res) => res.status(200).send(`${this.expressServerPort}`));
        this.expressServer.use('/', routes);
        this.expressApp = this.expressServer.listen(this.expressServerPort, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${this.expressServerPort}`);
            this.isRun = true;
        })
        this.expressApp.keepAliveTimeout = this.expressOptions.keepAliveTimeout;
        this.expressApp.timeout = this.expressOptions.timeout;

        return this.expressApp;
    }

    public stopServer() {
        this.expressApp.close(() => {
            console.log(`⚡️[server]: Server is stopping at http://localhost:${this.expressServerPort}`);
        })
    }

}

export {
    Doctor as DoctorService
}
