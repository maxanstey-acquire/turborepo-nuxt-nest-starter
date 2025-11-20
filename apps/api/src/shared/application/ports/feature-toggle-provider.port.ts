import { FeatureFlagKey } from '@app/shared/types/feature-flags';

export abstract class FeatureToggleProvider {
  private constructor() {}

  abstract isEnabled(flag: FeatureFlagKey): Promise<boolean>;
}
