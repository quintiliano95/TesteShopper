import { Schema, model, Document } from 'mongoose';

interface Measure extends Document {
    customer_code: string;
    measure_datetime: Date;
    measure_type: 'WATER' | 'GAS';
    image_url: string;
    value: number;
    confirmed: boolean;
    uuid: string;
}

const measureSchema = new Schema<Measure>({
    customer_code: { type: String, required: true },
    measure_datetime: { type: Date, required: true },
    measure_type: { type: String, enum: ['WATER', 'GAS'], required: true },
    image_url: { type: String, required: true },
    value: { type: Number, required: true },
    confirmed: { type: Boolean, default: false },
    uuid: { type: String, required: true }
});

export const MeasureModel = model<Measure>('Measure', measureSchema);
