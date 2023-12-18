import { NextFunction, Response } from 'express';
export declare const filesPayloadExists: (req: any, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
