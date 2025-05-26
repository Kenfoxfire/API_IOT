import mongoose from 'mongoose';
import { logError, logInfo, logSuccess } from '../utils/logs.utils';
 export const connectDB = async () => {
    try {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_IOTDB } = process.env;

        const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_IOTDB}`;

        const options = {
            authSource: 'admin',
        }

        await mongoose.connect(uri, options);
        logSuccess('MongoDB connected');
    } catch (err) {
        logError('MongoDB connection error:', err);
        process.exit(1);
    }
};
