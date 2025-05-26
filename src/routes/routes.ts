import { Router } from 'express';
import { TestRoutes } from './test/test.route';
import { AuthRoutes } from './auth/test.route';


export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use('/api/test', TestRoutes.test);
        router.use('/api/auth', AuthRoutes.auth);
        return router;
    }
}

