export type Subscription = {
    id: string;
    status: 'active' | 'expired';
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};
