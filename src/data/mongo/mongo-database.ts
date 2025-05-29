import mongoose from 'mongoose';
import { logError, logSuccess } from '../../utils/logs.utils';

export class MongoDatabase {

    static async connectDB() {
        try {
            const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_IOTDB } = process.env;
            const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
            const options: mongoose.ConnectOptions = {
                dbName: MONGO_IOTDB,
                authSource: 'admin',
            }
            await mongoose.connect(uri, options);
            logSuccess('MongoDB connected');

        } catch (err) {
            logError('MongoDB connection error:', err);
            process.exit(1);
        }
    }
  }