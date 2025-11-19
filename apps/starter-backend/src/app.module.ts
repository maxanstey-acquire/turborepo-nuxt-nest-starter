import { Module } from '@nestjs/common';
import { FeatureFlagModule } from './modules/feature-flag/feature-flag.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [FeatureFlagModule, UserModule],
})
export class AppModule {}
