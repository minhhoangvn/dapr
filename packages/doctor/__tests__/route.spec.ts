import { assert } from 'console';
import { Agent } from 'http'
import * as axios from 'axios';

import { DoctorService } from '../src/index';
describe("test svc route", () => {

    it("should have route to register path", async () => {
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
});