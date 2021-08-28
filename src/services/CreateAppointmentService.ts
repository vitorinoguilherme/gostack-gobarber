import { startOfHour } from 'date-fns';

import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

// DRY: Don't repeat Yourself 

interface Request {
  provider: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 * 
 * Single Responsability Principle
 * Dependency Invertion Principle
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;