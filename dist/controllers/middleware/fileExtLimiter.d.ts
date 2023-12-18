import { NextFunction, Response } from 'express';
export declare const fileExtLimiter: (allowedExtArray: Array<string>) => (req: any, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
