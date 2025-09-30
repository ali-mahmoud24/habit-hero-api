import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { Roles } from '@/common/decorators/roles.decarator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { Role, User } from '@prisma/client';

@Controller('admin/users')
// @UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@UseInterceptors(TransformInterceptor)
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.adminUsersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.adminUsersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateAdminUserDto): Promise<User> {
    return this.adminUsersService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAdminUserDto): Promise<User> {
    return this.adminUsersService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.adminUsersService.delete(id);
  }
}
