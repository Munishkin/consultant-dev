import { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  return res.send('Please specify a valid route.');
};
