import { Injectable } from '@nestjs/common';
import { ProfilePictureService } from '../application/ports/profile-picture-service.port';

@Injectable()
export class RandomProfilePictureService implements ProfilePictureService {
  getUrl(userId: string): Promise<string> {
    const seed = encodeURIComponent(userId);

    return Promise.resolve(
      `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`,
    );
  }
}
