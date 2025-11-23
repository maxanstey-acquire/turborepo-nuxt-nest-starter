import { Subscription } from '../../domain/subscription.entity';

export abstract class SubscriptionRepository {
  private constructor() {}

  abstract findById(id: string): Promise<Subscription | null>;

  abstract save(subscription: Subscription): Promise<void>;
}
