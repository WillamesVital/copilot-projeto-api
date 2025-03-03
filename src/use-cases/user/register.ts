import { User } from "../../entities/user";
import UserRepository from "../../repositories/user-repository";
import bcrypt from 'bcrypt';

export default class Register {

    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string, name: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.name = name;
        return this.userRepository.save(user);
    }
}