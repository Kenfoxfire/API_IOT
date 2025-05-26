import { Router } from "express";

import container from "../../container";
import { TestController } from "../../controllers/test/test.controller";

export class AuthRoutes {

    static get auth(): Router {
        const router = Router();
        const testController = new TestController(container.foolService);

        router.post('/login', (req, res) => testController.test(req, res));
        router.post('/register', (req, res) => testController.test(req, res));
        return router;
    }
}