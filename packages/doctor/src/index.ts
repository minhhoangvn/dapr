require('module-alias/register');
import { DoctorService } from '@/server';

const service = new DoctorService();
service.startServer();
