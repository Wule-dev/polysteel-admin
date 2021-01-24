import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const AuthMiddleware = (
  req: Request & { headers: { user: Object } },
  res: Response,
  next: NextFunction,
): Response<JSON> => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'No token provided' });

  const parts = authorization.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid Token' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformated' });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid Token' });

    req.headers.user = decoded;

    return next();
  });

  return null;
};

export default AuthMiddleware;
