import path from 'path';
import { NextFunction, Response } from 'express';

export const fileExtLimiter = (allowedExtArray: Array<string>) => {
  return (req: any, res: Response, next: NextFunction) => {
    const files = req.files;

    const fileExtensions: [] = [];

    Object.keys(files).forEach((key) => {
      const extName: String = path.extname(files[key].name);
      // @ts-ignore
      fileExtensions.push(extName);
    });

    // Are the file extension allowed?
    const allowed = fileExtensions.every((ext) => allowedExtArray.includes(ext));

    if (!allowed) {
      const formats = allowedExtArray.map((ext) => ext.replace('.', '')).join(', ');
      const message = `Upload failed,${formats.toString()} files are only allowed.`.replace(',', ', ');

      return res.status(400).json({ status: 'error', message });
    }

    next();
  };
};
