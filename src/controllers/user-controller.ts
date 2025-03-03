// crie um controller para o usuário, inicialmente implementando o caso de uso Login

import { Request, Response } from 'express';
import Login from '../use-cases/user/login';
import UserRepository from '../repositories/user-repository';
import databaseService from '../service/database-service';
import Register from '../use-cases/user/register';
import bcrypt from 'bcrypt';

export default class UserController {
    
    static async login(request: Request, response: Response) {
        const { login, password } = request.body;
        const userRepository = new UserRepository();
        const loginUseCase = new Login(userRepository);
    
        try {
            const user = await loginUseCase.execute(login, password);
            response.json(user);
        } catch (error: any) {
            response.status(400).json({ message: error.message });
        }
    }

    static async register(request: Request, response: Response) {
        const { email, password, name } = request.body;
        const userRepository = new UserRepository();
        const registerUseCase = new Register(userRepository);

        try {
            const user = await registerUseCase.execute(email, password, name);
            response.json(user);
        } catch (error: any) {
            response.status(400).json({ message: error.message });
        }
}
}
