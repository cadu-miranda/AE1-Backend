import { Request, Response } from "express";
import UserService from "../database/services/User.service";
import generateToken from "../helpers/generateToken";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async store(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const emailExists = await this.userService.findByEmail(data.email);

      if (emailExists)
        return res.status(403).json({ message: "E-mail já cadastrado!" });

      const user = await this.userService.store(data);

      return res
        .status(201)
        .json({ user, token: generateToken({ id: user.id }) });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAll();

      if (users.length > 0) return res.status(200).json(users);
      return res.status(204).json();
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const user = await this.userService.findByPk(+id);

      if (user === null) return res.status(204).json();
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = req.body;

      const user = await this.userService.findByPk(+id);

      if (user === null) return res.status(204).json();
      await this.userService.update(+id, data);

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso!" });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const user = await this.userService.findByPk(+id);

      if (user === null) return res.status(204).json();

      await this.userService.destroy(+id);

      return res.status(200).json({ message: "Usuário removido com sucesso!" });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }
}

export default new UserController();
