import { NextFunction, Request, Response } from 'express';

export function log(req: Request, res: Response, next: NextFunction) {
  console.log('\n------------------------\n');
  console.log(
    `${new Date().toISOString()} : ${req.method.toUpperCase()} -> ${req.path}`,
  );
  console.log(req.body);

  next();
}
