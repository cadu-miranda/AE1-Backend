/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthConfig from "../config/AuthConfig";

class Authorization {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader)
        return res.status(401).send({ message: "Nenhum token providenciado" });

      const tokenParts = authHeader.split(" ");

      if (!(tokenParts.length === 2))
        return res.status(401).send({ message: "Erro no token" });

      const [scheme, token] = tokenParts; // scheme = 'Bearer ' e token = token

      if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ message: "Token mal-formatado" });

      jwt.verify(token, AuthConfig.secret, (e, decoded: { id: number }) => {
        // decoded = token do usuário

        if (e) return res.status(401).send({ message: "Token inválido" });

        req.userId = decoded.id;

        return next();
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Authorization();
