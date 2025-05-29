import { Router } from "express";

import container from "../container";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {

    static get auth(): Router {
        const router = Router();
        const authController = new AuthController(container.secureService);

        router.post('/login', authController.login);
        router.post('/register', authController.registerUser );
        return router;
    }
}