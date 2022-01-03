import { assert } from 'console';

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

    it("should allow client can define svc server config with timeout", async () => {

    })
});