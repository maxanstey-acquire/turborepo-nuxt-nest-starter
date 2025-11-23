import type { Subscription as SubscriptionDto } from '@app/shared/types/subscription';
import { Subscription } from '../domain/subscription.entity';

export class SubscriptionDtoMapper {
  static toDto(raw: Subscription): SubscriptionDto {
    return {
      id: raw.id,
      status: raw.status,
      expiresAt: raw.expiresAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
