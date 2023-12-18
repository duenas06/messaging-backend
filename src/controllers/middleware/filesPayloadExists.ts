import { NextFunction, Response } from 'express';

export const filesPayloadExists = (req: any, res: Response, next: NextFunction) => {
  if (!req.hasOwnProperty('files')) return res.status(400).json({ status: 'error', message: 'No file found to process' });
  next();
};
