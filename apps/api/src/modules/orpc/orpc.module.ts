import { Logger } from '@nestjs/common';
import { onError, ORPCModule } from '@orpc/nest';

export const OrpcModule = ORPCModule.forRootAsync({
  useFactory: () => ({
    interceptors: [
      onError((error) => {
        Logger.error(error);
      }),
    ],
  }),
});
