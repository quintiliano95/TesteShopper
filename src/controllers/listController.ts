import { Request, Response } from 'express';
import { MeasureModel } from '../models/measurementModel';

export const listController = async (req: Request, res: Response) => {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    const query: any = { customer_code };

    if (measure_type) {
        query.measure_type = (measure_type as string).toUpperCase();
    }

    const measures = await MeasureModel.find(query);
    return res.status(200).json(measures);
};
