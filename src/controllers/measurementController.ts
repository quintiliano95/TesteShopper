import { Request, Response } from 'express';
import { extractMeasurementValue } from '../services/aiService';
import { MeasurementModel } from '../models/measurementModel';

export const uploadMeasurement = async (req: Request, res: Response) => {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Validações e integração com AI Service
    const recognizedValue = await extractMeasurementValue.getMeasureFromImage(image);
    
    // Criação de um novo registro no banco de dados
    const measurement = new MeasurementModel({
        customer_code,
        measure_datetime,
        measure_type,
        value: recognizedValue,
    });

    await measurement.save();

    return res.json({
        image_link: `https://temp-url.com/${measurement.id}`,
        measure_uuid: measurement.id,
        recognized_value: recognizedValue
    });
};

export const confirmMeasurement = async (req: Request, res: Response) => {
    const { measure_uuid, confirmed_value } = req.body;

    // Atualiza o valor confirmado no banco de dados
    await MeasurementModel.findByIdAndUpdate(measure_uuid, { value: confirmed_value });

    return res.json({ message: 'Confirmação realizada com sucesso!' });
};

export const listMeasurements = async (req: Request, res: Response) => {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    const filters: any = { customer_code };
    if (measure_type) filters.measure_type = (measure_type as string).toUpperCase();

    const measurements = await MeasurementModel.find(filters);
    return res.json(measurements);
};
