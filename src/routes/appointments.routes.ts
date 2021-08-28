import { response, Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// SoC: Separation of Concerns (Separação de preocupações)

// DTO - Data Transfer Object

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', (req, resp) => {
  const appointments = appointmentsRepository.all();
  
  return resp.json(appointments);
});

// POST http://localhost:3333/appointments

appointmentsRouter.post('/', (req, resp) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);
    
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );
    
    const appointment = createAppointment.execute({ date: parsedDate, provider });

    return resp.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;