import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/water_gas_db');
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};
