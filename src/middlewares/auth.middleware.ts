import { NextFunction, Request, Response } from "express";
import { logError } from "../utils/logs.utils";
import { JwtAdapter } from "../config";
import { UserModel } from "../data/mongo/models/user.model";

export class AuthMiddleware {

    static async validateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.header('Authorization');
        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return
        }
        if (!token.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Invalid Bearer token' });
            return
        }
        const jwtToken = token.split(' ')[1] || '';

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(jwtToken)
            if (!payload) {
                res.status(401).json({ message: 'Invalid token' });
                return
            }

            const user = await UserModel.findById(payload.id);
            if (!user) {
                res.status(401).json({ message: 'User not found' })
                return
            };

            if (req.body) { // Validate if req.body exists <if the request has a body>
                req.body.user = user.toObject()
            }

            next();
        } catch (error) {
            logError('Error while validating token', error);
            {
                res.status(500).json({ error: 'Internal server error' })
                return
            };
        }
    }
}