import { Agent } from 'http'
import * as axios from 'axios';

import { DoctorService } from '../src/server';

describe("test svc state", () => {
    it("should export svc object", () => {
        expect(DoctorService).not.toBeNull()
    })

    it("should start doctor svc with port 8811", async () => {
        // Arrange 
        const doctorSvc = new DoctorService();

        // Action
        doctorSvc.startServer();
        await new Promise((r) => setTimeout(r, 100));

        // Assert
        expect(doctorSvc.isRun).toBeTruthy();
        doctorSvc.stopServer();
        await new Promise((r) => setTimeout(r, 3000));
    });

    it("should allow client can define svc server port config", async () => {
        // Arrange 
        const axiosInstance = axios.default.create({
            timeout: 1000,
            httpAgent: new Agent({ keepAlive: true, keepAliveMsecs: 3000, maxSockets: 2 }),

        });
        const doctorSvc = new DoctorService(8182);

        // Action
        doctorSvc.startServer();
        await new Promise((r) => setTimeout(r, 100));

        // Assert
        const response = await axiosInstance.get("http://localhost:8182/ping")
        expect(parseInt(response.data)).toBe(8182)
        doctorSvc.stopServer();
        await new Promise((r) => setTimeout(r, 100));
    })

    it("should allow client can define express option config", async () => {
        // Arrange 
        const axiosInstance = axios.default.create({
            timeout: 1000,
            httpAgent: new Agent({ keepAlive: true, keepAliveMsecs: 3000, maxSockets: 2 }),

        });

        const options = {
            keepAliveTimeout: 1000,
            timeout: 1000
        }
        const doctorSvc = new DoctorService(8183, options);

         // Action
         doctorSvc.startServer();
         await new Promise((r) => setTimeout(r, 100));
 
         // Assert
         const response = await axiosInstance.get("http://localhost:8183/ping")
         expect(response.headers['connection']).toEqual("keep-alive");
         expect(response.headers['keep-alive']).toEqual("timeout=1");
         expect(parseInt(response.data)).toBe(8183)
         doctorSvc.stopServer();
         await new Promise((r) => setTimeout(r, 1500));
    }
    )
});