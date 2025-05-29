import { Request, Response } from "express";
import { CustomError } from "../errors/custom.error";
import { SecureService } from "../services/secure.service";
import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";

export class DeviceController {

    constructor(private readonly secureService: SecureService) { }


    login = (req: Request, res: Response) => {
        const [error, loginDto] = LoginUserDto.create(req.body);
        if (error) {
            res.status(400).json({ error })
            return;
        }
        this.secureService.loginUser(loginDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    registerUser = (req: Request, res: Response) => {
        // Implement login logic here
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) {
            res.status(400).json({ error })
            return;
        }

        this.secureService.registerUser(registerDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));
    }


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' })
    }

}