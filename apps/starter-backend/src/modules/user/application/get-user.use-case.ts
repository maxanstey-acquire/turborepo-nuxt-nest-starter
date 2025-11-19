import { Injectable } from '@nestjs/common';
import {
  FeatureToggleProvider,
  type FeatureFlagKey,
} from '@speechscribe/contracts/ports/feature-toggle-provider.port';
import { ProfilePictureService } from './ports/profile-picture-service.port';
import type { User } from '@speechscribe/shared/types/user';

const PROFILE_AVATAR_FLAG: FeatureFlagKey = 'profile-avatars';

@Injectable()
export class GetUserUseCase {
  constructor(
    private readonly profilePicturePort: ProfilePictureService,
    private readonly featureFlags: FeatureToggleProvider,
  ) {}

  async execute(): Promise<User> {
    const user = {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
    };

    const avatarsEnabled =
      await this.featureFlags.isEnabled(PROFILE_AVATAR_FLAG);

    const avatarUrl = avatarsEnabled
      ? await this.profilePicturePort.getUrl(user.id)
      : undefined;

    return {
      ...user,
      avatarUrl,
    };
  }
}
