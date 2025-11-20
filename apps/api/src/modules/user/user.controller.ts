import { contract } from '@app/contracts/contract';
import { Controller } from '@nestjs/common';
import { Implement } from '@orpc/nest';
import { implement } from '@orpc/server';
import { GetUserUseCase } from './application/get-user.use-case';

@Controller()
export class UserController {
  constructor(private readonly getUser: GetUserUseCase) {}

  @Implement(contract.auth.me)
  me() {
    return implement(contract.auth.me).handler(async () => {
      return {
        user: await this.getUser.execute(),
      };
    });
  }
}
