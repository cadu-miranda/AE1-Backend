import express, { Request, Response } from "express";
import AuthController from "../../controllers/AuthController";

const routes = express.Router();

routes.post("/auth/login", (req: Request, res: Response) =>
  AuthController.login(req, res)
);
routes.post("/auth/forgot", (req: Request, res: Response) =>
  AuthController.forgot(req, res)
);
routes.post("/auth/reset", (req: Request, res: Response) =>
  AuthController.reset(req, res)
);
routes.post("/users/token", (req: Request, res: Response) =>
  AuthController.getUserByToken(req, res)
);

export default routes;
