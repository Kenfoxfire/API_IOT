// Imports 
import express, { Router } from 'express';
// import morgan from 'morgan';
// import cors from "cors"
import { connectDB } from './config/db';
import { Server } from './presentation/server';
import { AppRoutes } from './routes/routes';




(async () => {
    main();
})();


function main() {
    const server = new Server({
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
        routes: AppRoutes.routes,
        public_path: 'public',
    });
    connectDB().then(() => {
        server.start();
    })
}

