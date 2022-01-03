import { assert } from 'console';
import * as axios from 'axios';

import { DoctorService } from '../src/index';
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
        await new Promise((r) => setTimeout(r, 100));
    });

    it("should allow client can define svc server port config", async () => {
        // Arrange 
        const doctorSvc = new DoctorService(8182);

        // Action
        doctorSvc.startServer();
        await new Promise((r) => setTimeout(r, 100));

        // Assert
        const response = await axios.default.get("http://localhost:8182/ping")
        expect(parseInt(response.data)).toBe(8182)
        doctorSvc.stopServer();
        await new Promise((r) => setTimeout(r, 100));
    })
});