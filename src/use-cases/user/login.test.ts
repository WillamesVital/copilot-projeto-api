import { expect, test } from 'vitest';
import  Login  from './login';
import UserRepository from '../../repositories/user-repository';

class MockUserRepository extends UserRepository {
    async findByEmailAndPassword(login: string, password: string) {
        return {
            id: 1,
            email: 'test@test.com',
            name: 'Admin',
            password: 'teste123'
        };
    }
}

test('should return user if login is successful', async () => {
    const userRepository = new MockUserRepository();
    const login = new Login(userRepository);
    const user = await login.execute('test@test.com', 'teste123');``
    expect(user).toEqual({
        id: 1,
        email: 'test@test.com',
        name: 'Admin',
        password: 'teste123'
    });
});

test('Login with invalid password should throw an error', async () => {
    const userRepository = new MockUserRepository();
    const login = new Login(userRepository);
    try {
        await login.execute('invalido@test.com', 'test 123');
    } catch (error: any) {
        expect(error.message).toEqual('Invalid login or password');
    }
});

test('Login with non-existent email should throw an error', async () => {
    const userRepository = new MockUserRepository();
    const login = new Login(userRepository);
    try {
        await login.execute('nonexistent@test.com', 'teste123');
    } catch (error: any) {
        expect(error.message).toEqual('Invalid login or password');
    }
});

test('Login with non-existent email should throw an error', async () => {
    const userRepository = new MockUserRepository();
    const login = new Login(userRepository);
    try {
        await login.execute('nonexistent@test.com', 'teste123');
    } catch (error: any) {
        expect(error.message).toEqual('Invalid login or password');
    }
});

test('Login with empty email should throw an error', async () => {
    const userRepository = new MockUserRepository();
    const login = new Login(userRepository);
    try {
        await login.execute('', 'teste123');
    } catch (error: any) {
        expect(error.message).toEqual('Invalid login or password');
    }
});

test('Login with empty password should throw an error', async () => {
    const userRepository = new MockUserRepository();
    const login = new Login(userRepository);
    try {
        await login.execute('test@test.com', '');
    } catch (error: any) {
        expect(error.message).toEqual('Invalid login or password');
    }
});