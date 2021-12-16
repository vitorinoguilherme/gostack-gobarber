import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

// index, show, create, update, delete

export default class ResetPasswordController {
  public async create(req: Request, resp: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      token,
      password,
    });

    return resp.status(204).json();
  }
}
