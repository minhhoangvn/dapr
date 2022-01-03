import { assert } from 'console';

import { DoctorService } from '../src/index';
describe("test start svc function", () => {
    it("should start doctor svc with port 8811", async () => {
        expect(DoctorService).not.toBeNull()
        const doctorSvc = new DoctorService();
        const serverApp = doctorSvc.startServer();
        await new Promise((r) => setTimeout(r, 100));
        expect(serverApp).not.toBeNull()
        expect(doctorSvc.isRun).toBeTruthy()
        doctorSvc.stopServer();
        await new Promise((r) => setTimeout(r, 100));
    });
});