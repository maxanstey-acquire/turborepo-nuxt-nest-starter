import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_CLIENT, PrismaClient } from '@app/prisma';
import { SubscriptionMapper } from './subscription.mapper';
import { SubscriptionRepository } from '../application/ports/subscription.repository.port';
import { Subscription } from '../domain/subscription.entity';

@Injectable()
export class PrismaSubscriptionRepository implements SubscriptionRepository {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Subscription | null> {
    const row = await this.prisma.subscription.findUnique({
      where: { id },
    });

    if (!row) {
      return null;
    }

    return SubscriptionMapper.toDomain(row);
  }

  async save(subscription: Subscription): Promise<void> {
    const record = SubscriptionMapper.toPersistence(subscription);

    await this.prisma.subscription.upsert({
      where: { id: record.id },
      create: record,
      update: record,
    });
  }
}
