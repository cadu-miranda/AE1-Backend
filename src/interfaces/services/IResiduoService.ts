/* eslint-disable no-unused-vars */
import { IResiduo } from "../models/IResiduo";

export interface IResiduoService {
  findByPk(id: IResiduo["id"]): Promise<IResiduo>;
  getAll(): Promise<IResiduo[]>;
  update(id: number, data: IResiduo): Promise<IResiduo>;
  destroy(id: number): Promise<void>;
  store(
    data: Pick<IResiduo, "name" | "address" | "collected">
  ): Promise<IResiduo>;
}
