import { Request, Response } from 'express';

/**
 * Middleware to monkey patch res.status to log status codes to console
 * @param {Request} req request object
 * @param {Response} res response object
 * @param {Function} next callback
 */
export function statusLogger(req: Request, res: Response, next: Function) {
  var _status = res.status;
  res.status = (data: number) => {
    console.debug(`Sending status ${data}`);
    res.status = _status;
    return res.status(data);
  };
  next();
}
