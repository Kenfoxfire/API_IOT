import { Router } from "express";

import container from "../../container";
import { TestController } from "../../controllers/test/test.controller";

export class TestRoutes {

    static get test(): Router {
        const router = Router();
        const testController = new TestController(container.foolService);

        router.get('/test', (req, res) => testController.test(req, res));
        return router;
    }
}