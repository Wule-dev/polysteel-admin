import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export = {
  async show(req: Request, res: Response) {
    const { authorization } = req.headers;
    const parts = authorization.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Invalid Token' });

    const user = jwt.decode(parts[1]);

    return res.status(200).json(user);
  },
};
