import { Controller } from '@nestjs/common';
import { Implement } from '@orpc/nest';
import { implement } from '@orpc/server';
import { contract } from '@app/contracts/contract';
import { SubscriptionRepository } from './application/ports/subscription.repository.port';
import { SubscriptionDtoMapper } from './application/subscription.dto.mapper';

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
          subscription: sub ? SubscriptionDtoMapper.toDto(sub) : null,
        };
      },
    );
  }
}
