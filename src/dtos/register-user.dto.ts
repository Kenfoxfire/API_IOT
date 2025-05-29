import { regularExps } from "../config";




export class RegisterUserDto {

    private constructor(
        public username: string,
        public email: string,
        public password: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { username, email, password } = object;

        if (!username) return ['Missing username'];
        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password too short'];

        return [undefined, new RegisterUserDto(username, email, password)];
    }
}