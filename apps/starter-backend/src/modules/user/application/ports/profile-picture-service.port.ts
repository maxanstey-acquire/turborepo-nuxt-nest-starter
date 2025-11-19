// REDDIT: I know this looks weird, but
//           1) Having a private constructor
//           2) Only "implementing" it (rather than "extending")
//         gives you a cheat way of getting runtime DI interfaces
//         for free.
export abstract class ProfilePictureService {
  private constructor() {}

  abstract getUrl(userId: string): Promise<string>;
}
