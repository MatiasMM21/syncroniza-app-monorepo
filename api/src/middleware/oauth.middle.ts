import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

interface IUser {
  id: string;
  email: string;
}

interface AuthRequest extends Request {
  user?: IUser;
}

const oauthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Obtener token de la cookie
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET) as IUser;
    
    // Añadir usuario a la solicitud
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("Error en middleware de autenticación:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

export default oauthMiddleware;
