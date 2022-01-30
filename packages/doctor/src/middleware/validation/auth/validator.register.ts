import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validatorRegister = (req: Request, res: Response, next: NextFunction) => { 
    return next();
}