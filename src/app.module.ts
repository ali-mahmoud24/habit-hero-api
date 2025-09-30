import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminUsersController } from './admin/users/admin-users.controller';
import { AdminModule } from './admin/admin.module';
import { AdminUsersService } from './admin/users/admin-users.service';

@Module({
  imports: [PrismaModule, AdminModule],
  controllers: [AppController, AdminUsersController],
  providers: [AppService, AdminUsersService],
})
export class AppModule {}
