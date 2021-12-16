import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

// GET (body) => http://localhost:3333/rota?year=2020&month=5&day=20

export default class ProviderAppointmentsController {
  public async index(req: Request, resp: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.query;

    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return resp.json(classToClass(appointments));
  }
}
