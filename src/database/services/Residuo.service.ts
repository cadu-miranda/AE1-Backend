import { IResiduo } from "../../interfaces/models/IResiduo";
import { IResiduoService } from "../../interfaces/services/IResiduoService";
import Residuo from "../models/Residuo";

class ResiduoService implements IResiduoService {
  async store(data: Pick<IResiduo, "name" | "collected">): Promise<IResiduo> {
    const residuo = await Residuo.create({ ...data });

    return residuo;
  }

  async getAll(): Promise<IResiduo[]> {
    const residuos = await Residuo.findAll();

    return residuos;
  }

  findByPk(id: number): Promise<IResiduo> {
    return Residuo.findByPk(id);
  }

  async update(id: number, data: IResiduo): Promise<IResiduo> {
    await Residuo.update(data, { where: { id } });

    const updatedResiduo = await Residuo.findByPk(id);

    return updatedResiduo;
  }

  async destroy(id: number): Promise<void> {
    await Residuo.destroy({ where: { id } });
  }
}

export default ResiduoService;
