import { UserModel } from "../data/mongo/models/user.model";
import { CustomError } from "../errors/custom.error";
import { bcryptAdapter, JwtAdapter } from "../config";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";

export class SecureService {

    constructor() {}

    public async registerUser(registerUserDto: RegisterUserDto ){
        const existUser = await UserModel.findOne({email: registerUserDto.email});
        if (existUser) throw CustomError.badRequest('Email already exist');

        try {
            const user = new UserModel(registerUserDto);

            const hashedPassword = bcryptAdapter.hash(registerUserDto.password);

            user.password_hash = hashedPassword;

            const savedUser = await user.save();

            const token = await JwtAdapter.generateToken({ id: user.id });
            if (!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: {
                    id: savedUser.id,
                    name: savedUser.username,
                    email: savedUser.email,
                },
                token: token,
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }



    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.badRequest('Email not exist');

        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password_hash);
        if (!isMatching) throw CustomError.badRequest('Password is not valid');


        const token = await JwtAdapter.generateToken({ id: user.id });
        if (!token) throw CustomError.internalServer('Error while creating JWT');

        return {
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
            },
            token: token,
        }

    }

}