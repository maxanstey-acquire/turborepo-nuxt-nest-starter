export const FEATURE_FLAG_KEYS = ['profile-avatars', 'beta-dashboard'] as const;
export type FeatureFlagKey = (typeof FEATURE_FLAG_KEYS)[number];

// REDDIT: I know this looks weird, but
//         1) Having a private constructor
//         2) Only "implementing" it (rather than "extending")
//         gives you a cheat way of getting runtime DI interfaces
//         for free.
export abstract class FeatureToggleProvider {
  private constructor() {}

  abstract isEnabled(
    flag: FeatureFlagKey,
  ): Promise<boolean>;
}
