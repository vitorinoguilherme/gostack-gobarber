import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const user_id = req.user.id;
    const { provider_id, date } = req.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: date,
      provider_id,
      user_id,
    });

    return resp.json(appointment);
  }
}
