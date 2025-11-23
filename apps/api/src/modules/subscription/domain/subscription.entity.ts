export type SubscriptionStatus = 'active' | 'expired';

export class Subscription {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public status: SubscriptionStatus,
    public expiresAt: Date | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  isExpired(): boolean {
    if (!this.expiresAt) {
      return false;
    }

    return this.expiresAt < new Date();
  }
}
