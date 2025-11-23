import { Module } from '@nestjs/common';
import { PrismaClientProvider } from './prisma.provider.js';

@Module({
  providers: [PrismaClientProvider],
  exports: [PrismaClientProvider],
})
export class PrismaModule {}
