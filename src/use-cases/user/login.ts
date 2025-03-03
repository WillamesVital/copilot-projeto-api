import { User } from "../../entities/user";
import UserRepository from "../../repositories/user-repository";

export default class Login {

    constructor(private userRepository: UserRepository) {}

    async execute(login: string, password: string): Promise<User> {
        const user = await this.userRepository.findByEmailAndPassword(login, password);
        if (!user) throw new Error('Invalid login or password');
        return user;
    }
}
