// Imports 
import { Server } from './presentation/server';
import { AppRoutes } from './routes/routes';
import { MongoDatabase } from './data/mongo/mongo-database';




(async () => {
    main();
})();


function main() {
    const server = new Server({
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
        routes: AppRoutes.routes,
        public_path: 'public',
    });
    MongoDatabase.connectDB().then(() => {
        server.start();
    })
}

