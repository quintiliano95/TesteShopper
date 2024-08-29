import { Request, Response } from 'express';
import { MeasureModel } from '../models/measureModel';

export const confirmController = async (req: Request, res: Response) => {
    const { measure_uuid, confirmed_value } = req.body;

    const measure = await MeasureModel.findOne({ uuid: measure_uuid });

    if (!measure) {
        return res.status(404).json({ error: 'Measure not found' });
    }

    if (measure.confirmed) {
        return res.status(400).json({ error: 'Measure already confirmed' });
    }

    measure.value = confirmed_value;
    measure.confirmed = true;
    await measure.save();

    return res.status(200).json({ message: 'Measure confirmed successfully' });
};
