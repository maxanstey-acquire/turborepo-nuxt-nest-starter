import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core.module';
import { FeatureFlagModule } from './modules/feature-flag/feature-flag.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CoreModule, FeatureFlagModule, UserModule],
})
export class AppModule {}
