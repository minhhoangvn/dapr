import * as express from 'express';
import { Server } from 'http';

export class Doctor {
    private expressServerPort: number;
    private expressServer: express.Application;
    public isRun: boolean;
    private expressApp: Server;
    constructor(port: number = 8881) {
        this.expressServerPort = port;
    }

    public startServer(): Server {
        this.expressServer = express();
        this.expressServer.get('/ping', (req, res) => res.status(200).send(`${this.expressServerPort}`));
        this.expressApp = this.expressServer.listen(this.expressServerPort, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${this.expressServerPort}`);
            this.isRun = true;
        })
        this.expressApp.keepAliveTimeout = 100;
        this.expressApp.timeout = 100;
        return this.expressApp;
    }

    public stopServer() {
        this.expressApp.close(() => {
            console.log(`⚡️[server]: Server is stopping at https://localhost:${this.expressServerPort}`);
        })
    }

}

export {
    Doctor as DoctorService
}
