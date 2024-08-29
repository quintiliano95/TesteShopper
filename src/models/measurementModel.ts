import mongoose, { Schema, Document } from 'mongoose';

export interface IMeasurement extends Document {
    customer_code: string;
    measure_datetime: Date;
    measure_type: string;
    value: number;
}

const MeasurementSchema: Schema = new Schema({
    customer_code: { type: String, required: true },
    measure_datetime: { type: Date, required: true },
    measure_type: { type: String, required: true },
    value: { type: Number, required: true },
});

export const MeasurementModel = mongoose.model<IMeasurement>('Measurement', MeasurementSchema);
