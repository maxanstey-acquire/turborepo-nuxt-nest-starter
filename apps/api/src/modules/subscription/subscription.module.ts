import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { SubscriptionRepository } from './application/ports/subscription.repository.port';
import { PrismaSubscriptionRepository } from './infrastructure/prisma-subscription.repository';
import { SubscriptionMapper } from './infrastructure/subscription.mapper';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionMapper,
    {
      provide: SubscriptionRepository,
      useClass: PrismaSubscriptionRepository,
    },
  ],
  exports: [SubscriptionRepository],
})
export class SubscriptionModule {}
