export abstract class ProfilePictureService {
  private constructor() {}

  abstract getUrl(userId: string): Promise<string>;
}
