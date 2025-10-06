import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { configValidationSchema } from '@/config/config.validation';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
