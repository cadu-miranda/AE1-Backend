import { Request, Response } from "express";
import ResiduoService from "../database/services/Residuo.service";

class ResiduoController {
  private residuoService: ResiduoService;

  constructor() {
    this.residuoService = new ResiduoService();
  }

  async store(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const residuo = await this.residuoService.store(data);

      return res.status(201).json(residuo);
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const residuos = await this.residuoService.getAll();

      if (residuos.length > 0) return res.status(200).json(residuos);
      return res.status(204).json();
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const residuo = await this.residuoService.findByPk(+id);

      if (residuo === null) return res.status(204).json();
      return res.status(200).json(residuo);
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = req.body;

      const residuo = await this.residuoService.findByPk(+id);

      if (residuo === null) return res.status(204).json();
      await this.residuoService.update(+id, data);

      return res
        .status(200)
        .json({ message: "Resíduo atualizado com sucesso!" });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const residuo = await this.residuoService.findByPk(+id);

      if (residuo === null) return res.status(204).json();

      await this.residuoService.destroy(+id);

      return res.status(200).json({ message: "Resíduo removido com sucesso!" });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }
}

export default new ResiduoController();
