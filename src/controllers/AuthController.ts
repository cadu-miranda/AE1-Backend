import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import generateToken from "../helpers/generateToken";
import Mail from "../helpers/mailer";
import UserService from "../database/services/User.service";

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const user = await this.userService.findByEmail(email);

      if (user) {
        if (!(await bcrypt.compare(password, user.password)))
          return res.status(400).json({ message: "Senha inválida!" });

        const newUser = {
          id: user.id,
          email: user.email,
        };

        return res.status(200).json({ user, token: generateToken(newUser) });
      }

      return res.status(200).json({ user });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async getUserByToken(req: Request, res: Response): Promise<Response> {
    try {
      const { token } = req.body;

      const userInfo = jwt.decode(token) as { id: number; email: string };

      const user = await this.userService.findByPk(userInfo.id);

      return res.status(200).json({ token, user });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async forgot(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      const user = await this.userService.findByEmail(email);

      if (user) {
        const recoverPasswordCode = crypto.randomBytes(20).toString("hex");
        const now = new Date();

        now.setHours(now.getHours() + 1); // expiração do código em 1 hora

        await this.userService.update(user.id, {
          ...user,
          passwordResetToken: recoverPasswordCode,
          passwordResetExpires: now,
        });

        Mail.to = email;
        Mail.subject = "Recuperação de senha";
        Mail.message = `Olá, ${user.name}. Entre com o código de recuperação: ${recoverPasswordCode} para cadastrar uma nova senha.`;

        Mail.sendEmail();

        return res.status(200).json({ message: "Token enviado com sucesso!" });
      }

      return res.status(204).json({ message: "Usuário não encontrado!" });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async reset(req: Request, res: Response): Promise<Response> {
    try {
      const { email, token, password } = req.body;

      const user = await this.userService.findByEmail(email);

      if (token !== user.passwordResetToken)
        return res.status(400).json({ message: "Token inválido!" });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return res
          .status(400)
          .json({ message: "Token expirado. Gere um novo!" });

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await this.userService.update(user.id, {
        ...user,
        password: hashedPassword,
      });

      return res
        .status(200)
        .json({ message: "Nova senha cadastrada com sucesso!" });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }
}

export default new AuthController();
