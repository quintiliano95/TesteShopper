import { Request, Response } from 'express';
import { MeasureModel } from '../models/measureModel';
import { validateBase64 } from '../utils/validateBase64';
import { llmService } from '../services/llmService';
import { v4 as uuidv4 } from 'uuid';

export const uploadController = async (req: Request, res: Response) => {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    if (!validateBase64(image)) {
        return res.status(400).json({ error: 'Invalid base64 image' });
    }

    const existingMeasure = await MeasureModel.findOne({
        customer_code,
        measure_type,
        measure_datetime: {
            $gte: new Date(new Date(measure_datetime).getFullYear(), new Date(measure_datetime).getMonth(), 1),
            $lte: new Date(new Date(measure_datetime).getFullYear(), new Date(measure_datetime).getMonth() + 1, 0),
        }
    });

    if (existingMeasure) {
        return res.status(400).json({ error: 'Measure for this month already exists' });
    }

    try {
        const llmResponse = await llmService.getMeasureFromImage(image);
        const measure = new MeasureModel({
            customer_code,
            measure_datetime,
            measure_type,
            image_url: llmResponse.image_url,
            value: llmResponse.value,
            uuid: uuidv4(),
        });
        await measure.save();
        return res.status(201).json(measure);
    } catch (error) {
        return res.status(500).json({ error: 'Error processing the image' });
    }
};
