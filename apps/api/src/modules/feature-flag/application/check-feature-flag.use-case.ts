import { Injectable } from '@nestjs/common';
import { FeatureFlagKey } from '@speechscribe/shared/types/feature-flags';
import { FeatureToggleProvider } from '@ports/feature-toggle-provider.port';

@Injectable()
export class CheckFeatureFlagUseCase {
  constructor(private readonly featureFlags: FeatureToggleProvider) {}

  execute(flag: FeatureFlagKey): Promise<boolean> {
    return this.featureFlags.isEnabled(flag);
  }
}
