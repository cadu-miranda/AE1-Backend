import express, { Request, Response } from "express";
import ResiduoController from "../../controllers/ResiduoController";
import Authorization from "../../middlewares/Authorization";

const routes = express.Router();

routes.post(
  "/residuos",
  Authorization.authenticate,
  (req: Request, res: Response) => ResiduoController.store(req, res)
);
routes.get(
  "/residuos",
  Authorization.authenticate,
  (req: Request, res: Response) => ResiduoController.index(req, res)
);
routes.get(
  "/residuos/:id",
  Authorization.authenticate,
  (req: Request, res: Response) => ResiduoController.findOne(req, res)
);
routes.put(
  "/residuos/:id",
  Authorization.authenticate,
  (req: Request, res: Response) => ResiduoController.update(req, res)
);
routes.delete(
  "/residuos/:id",
  Authorization.authenticate,
  (req: Request, res: Response) => ResiduoController.destroy(req, res)
);

export default routes;
