import { Subscription as PrismaSubscription } from '@app/prisma';
import {
  Subscription,
  SubscriptionStatus,
} from '../domain/subscription.entity';

export class SubscriptionMapper {
  static toDomain(raw: PrismaSubscription): Subscription {
    return new Subscription(
      raw.id,
      raw.userId,
      raw.status as SubscriptionStatus,
      raw.expiresAt,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(raw: Subscription): PrismaSubscription {
    return {
      id: raw.id,
      userId: raw.userId,
      status: raw.status,
      expiresAt: raw.expiresAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
