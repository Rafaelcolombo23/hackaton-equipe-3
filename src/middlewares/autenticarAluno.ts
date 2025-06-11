import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta_simples";

export function autenticarAluno(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token não fornecido." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      ra: number;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email,
      ra: decoded.ra,
    };

    return next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado." });
    return;
  }
}
