export const FEATURE_FLAG_KEYS = ['profile-avatars', 'beta-dashboard'] as const;
export type FeatureFlagKey = (typeof FEATURE_FLAG_KEYS)[number];

export abstract class FeatureToggleProvider {
  private constructor() {}

  abstract isEnabled(
    flag: FeatureFlagKey,
  ): Promise<boolean>;
}
