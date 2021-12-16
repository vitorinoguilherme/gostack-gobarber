import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import SessionsControler from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsControler();

// POST http://localhost:3333/sessions

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
