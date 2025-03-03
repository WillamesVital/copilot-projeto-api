import { expect, test } from 'vitest';
import { User } from './user';

test('validateEmail should return true for valid email', () => {
    expect(User.validateEmail('')).toBe(false);
    expect(User.validateEmail('test')).toBeFalsy();
    expect(User.validateEmail('test@')).toBeFalsy();
    expect(User.validateEmail('test@test')).toBeFalsy();
    expect(User.validateEmail('test@test.')).toBeFalsy();
    expect(User.validateEmail('test@teste.com')).toBeTruthy();
});

test('validatePassword should return true for valid password', () => {
    expect(User.validatePassword('abcd')).toBe(false);
    expect(User.validatePassword('password')).toBeFalsy();
    expect(User.validatePassword('password1')).toBeFalsy();
    expect(User.validatePassword('Password1')).toBeFalsy();
    expect(User.validatePassword('Password@')).toBeFalsy();
    expect(User.validatePassword('12345678')).toBeFalsy();
    expect(User.validatePassword('12345678a')).toBeFalsy();
    expect(User.validatePassword('Password1@')).toBeTruthy();
});