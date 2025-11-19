import { Module } from '@nestjs/common';
import { FeatureToggleProvider } from '@speechscribe/contracts/ports/feature-toggle-provider.port';
import { CheckFeatureFlagUseCase } from './application/check-feature-flag.use-case';
import { FeatureFlagController } from './feature-flag.controller';
import { InMemoryFeatureToggleProvider } from './infrastructure/feature-toggle-provider.service';

@Module({
  controllers: [FeatureFlagController],
  providers: [
    CheckFeatureFlagUseCase,
    {
      provide: FeatureToggleProvider,
      useClass: InMemoryFeatureToggleProvider,
    },
  ],
  exports: [FeatureToggleProvider],
})
export class FeatureFlagModule {}
