import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

// index, show, create, update, delete

export default class UsersController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return resp.json(classToClass(user));
  }
}
