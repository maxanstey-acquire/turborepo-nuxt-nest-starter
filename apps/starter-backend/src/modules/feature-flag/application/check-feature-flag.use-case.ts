import { Injectable } from '@nestjs/common';
import {
  FeatureToggleProvider,
  type FeatureFlagKey,
} from '@speechscribe/contracts/ports/feature-toggle-provider.port';

@Injectable()
export class CheckFeatureFlagUseCase {
  constructor(private readonly featureFlags: FeatureToggleProvider) {}

  execute(flag: FeatureFlagKey): Promise<boolean> {
    return this.featureFlags.isEnabled(flag);
  }
}
