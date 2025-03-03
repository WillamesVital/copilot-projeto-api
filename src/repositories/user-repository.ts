import databaseService from "../service/database-service";
import { User } from "../entities/user";
import { Repository } from "typeorm";

class UserRepository {
    findById(id: string) {
        throw new Error("Method not implemented.");
    }
    save(user: User): User | PromiseLike<User> {
        throw new Error("Method not implemented.");
    }
    private repository: Repository<User>;

    constructor() { 
        this.repository = databaseService.getRepository(User);
    }

    async findByEmailAndPassword(login: string, password: string): Promise<User> {
        const user = await this.repository.findOne({ 
            where: { email: login, password: password }
        });
        if (!user) throw new Error('Invalid login or password');
        return user;
    }
}

export default UserRepository;