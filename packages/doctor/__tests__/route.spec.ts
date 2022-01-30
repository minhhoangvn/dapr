import { Agent } from 'http'
import * as axios from 'axios';

import { DoctorService } from '../src/server';

describe("test svc route", () => {

    it("should have route to register path", async () => {
        // Arrange 
        const axiosInstance = axios.default.create({
            timeout: 100,
            httpAgent: new Agent({ keepAlive: false, keepAliveMsecs: 100, maxSockets: 2 }),

        });
        const doctorSvc = new DoctorService();

        // Action
        doctorSvc.startServer();
        await new Promise((r) => setTimeout(r, 100));
        const response = await axiosInstance.post('http://localhost:8881/v1/auth/register');
        console.log(response.data);
        // Assert
        expect(doctorSvc.isRun).toBeTruthy();
        doctorSvc.stopServer();
        await new Promise((r) => setTimeout(r, 100));
    });
});