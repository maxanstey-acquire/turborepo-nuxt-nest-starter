import { contract } from '@app/contracts/contract';
import { Controller } from '@nestjs/common';
import { Implement } from '@orpc/nest';
import { implement } from '@orpc/server';
import { SubscriptionRepository } from './application/ports/subscription.repository.port';
import { SubscriptionMapper } from './infrastructure/subscription.mapper';

@Controller()
export class SubscriptionController {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  @Implement(contract.subscriptions.getById)
  getById() {
    return implement(contract.subscriptions.getById).handler(
      async ({ input }) => {
        const sub = await this.subscriptionRepository.findById(input.params.id);

        return {
          subscription: sub ? SubscriptionMapper.toDto(sub) : null,
        };
      },
    );
  }
}
