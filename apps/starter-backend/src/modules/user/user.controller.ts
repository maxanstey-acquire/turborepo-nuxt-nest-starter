import { Controller } from '@nestjs/common';
import { Implement } from '@orpc/nest';
import { implement } from '@orpc/server';
import { contract } from '@speechscribe/contracts/contract';
import { GetUserUseCase } from './application/get-user.use-case';
import type { MeResponse } from '@speechscribe/contracts/responses/me';

@Controller()
export class UserController {
  constructor(private readonly getUser: GetUserUseCase) {}

  @Implement(contract.auth.me)
  me() {
    return implement(contract.auth.me).handler(
      async (): Promise<MeResponse> => {
        return {
          user: await this.getUser.execute(),
        };
      },
    );
  }
}
