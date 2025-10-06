import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AdminUsersController } from './admin/users/admin-users.controller';
import { AdminModule } from './admin/admin.module';
import { AdminUsersService } from './admin/users/admin-users.service';

import { LoggerModule } from '@/common/logger/logger.module';
import { HttpLoggerMiddleware } from '@/common/middlewares/http-logger.middleware';

@Module({
  imports: [LoggerModule, PrismaModule, AdminModule],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
