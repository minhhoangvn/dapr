import { Router } from 'express';
import { register } from '@/controllers/auth';
import { validatorRegister } from '@/middleware';

const router = Router();


router.post('/register', [validatorRegister], register);
router.get('/register', [validatorRegister], register);

export default router;