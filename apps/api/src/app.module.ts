import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core.module';
import { FeatureFlagModule } from './modules/feature-flag/feature-flag.module';
import { OrpcModule } from './modules/orpc/orpc.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    OrpcModule,
    CoreModule,
    FeatureFlagModule,
    UserModule,
    SubscriptionModule,
  ],
})
export class AppModule {}
