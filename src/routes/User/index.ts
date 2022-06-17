import express, { Request, Response } from "express";
import UserController from "../../controllers/UserController";
import Authorization from "../../middlewares/Authorization";

const routes = express.Router();

routes.post(
  "/users",
  Authorization.authenticate,
  (req: Request, res: Response) => UserController.store(req, res)
);
routes.get(
  "/users",
  Authorization.authenticate,
  (req: Request, res: Response) => UserController.index(req, res)
);
routes.get(
  "/users/:id",
  Authorization.authenticate,
  (req: Request, res: Response) => UserController.findOne(req, res)
);
routes.put(
  "/users/:id",
  Authorization.authenticate,
  (req: Request, res: Response) => UserController.update(req, res)
);
routes.delete(
  "/users/:id",
  Authorization.authenticate,
  (req: Request, res: Response) => UserController.destroy(req, res)
);

export default routes;
