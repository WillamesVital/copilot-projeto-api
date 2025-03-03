import { expect, test } from 'vitest';
import Register from './register';
import UserRepository from '../../repositories/user-repository';
import bcrypt from 'bcrypt';
import { User } from '../../entities/user';

class MockUserRepository extends UserRepository {
    async save(user: User) {
        return {
            ...user,
            id: 1
        };
    }
}

test('should register a new user successfully', async () => {
    const userRepository = new MockUserRepository();
    const register = new Register(userRepository);
    const user = await register.execute('newuser@test.com', 'password123', 'New User');
    
    expect(user).toEqual({
        id: 1,
        email: 'newuser@test.com',
        name: 'New User',
        password: expect.any(String) 
    });

    const isPasswordCorrect = await bcrypt.compare('password123', user.password);
    expect(isPasswordCorrect).toBe(true);
});

test('should throw an error if user already exists', async () => {
    class ExistingUserRepository extends MockUserRepository {
        async save(user: User): Promise<{ id: number; name: string; email: string; password: string; }> {
            throw new Error('User already exists');
        }
    }

    const userRepository = new ExistingUserRepository();
    const register = new Register(userRepository);

    try {
        await register.execute('existinguser@test.com', 'password123', 'Existing User');
    } catch (error: any) {
        expect(error.message).toEqual('User already exists');
    }
});