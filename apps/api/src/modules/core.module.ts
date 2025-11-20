import { Global, Module } from '@nestjs/common';
import { FeatureToggleProvider } from '@ports/feature-toggle-provider.port';
import { FeatureFlagModule } from './feature-flag/feature-flag.module';
import { InMemoryFeatureToggleProvider } from './feature-flag/infrastructure/in-memory-feature-toggle-provider';

@Global()
@Module({
  imports: [FeatureFlagModule],
  providers: [
    {
      provide: FeatureToggleProvider,
      useClass: InMemoryFeatureToggleProvider,
    },
  ],
  exports: [FeatureToggleProvider],
})
export class CoreModule {}
