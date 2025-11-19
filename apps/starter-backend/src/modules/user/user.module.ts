import { Module } from '@nestjs/common';
import { FeatureFlagModule } from '../feature-flag/feature-flag.module';
import { GetUserUseCase } from './application/get-user.use-case';
import { ProfilePictureService } from './application/ports/profile-picture-service.port';
import { RandomProfilePictureService } from './infrastructure/random-profile-picture.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [FeatureFlagModule],
  providers: [
    GetUserUseCase,
    {
      provide: ProfilePictureService,
      useClass: RandomProfilePictureService,
    },
  ],
})
export class UserModule {}
