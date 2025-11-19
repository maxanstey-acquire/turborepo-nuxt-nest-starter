import { Injectable } from '@nestjs/common';
import {
  FeatureToggleProvider,
  type FeatureFlagKey,
} from '@speechscribe/contracts';

const DEFAULT_FLAGS: Record<FeatureFlagKey, boolean> = {
  'profile-avatars': true,
  'beta-dashboard': false,
};

@Injectable()
export class InMemoryFeatureToggleProvider implements FeatureToggleProvider {
  private readonly flags = DEFAULT_FLAGS;

  async isEnabled(flag: FeatureFlagKey): Promise<boolean> {
    // Simulate some async thing.
    return await Promise.resolve(this.flags[flag] ?? false);
  }
}
