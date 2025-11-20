import { Module } from '@nestjs/common';
import { CheckFeatureFlagUseCase } from './application/check-feature-flag.use-case';
import { FeatureFlagController } from './feature-flag.controller';

@Module({
  controllers: [FeatureFlagController],
  providers: [CheckFeatureFlagUseCase],
})
export class FeatureFlagModule {}
