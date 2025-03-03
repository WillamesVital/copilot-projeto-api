// crie as rotas para o usuário incluindo a rota de login
import { Router } from "express";
import UserController from "../controllers/user-controller";

const userRouter = Router();

userRouter.post('/login', UserController.login);
userRouter.post('/register', UserController.register);

export default userRouter;