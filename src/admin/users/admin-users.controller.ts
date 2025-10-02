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
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { AdminUsersService } from './admin-users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '@/common/decorators/roles.decarator';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Role } from '@prisma/client';
import { SerializeInterceptor } from '@/common/interceptors/serialize.interceptor';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Admin - Users')
@Controller('admin/users')
@Roles(Role.ADMIN)
// @UseGuards(RolesGuard) // enable when you want role protection
@UseInterceptors(new SerializeInterceptor(UserResponseDto)) // 🔥 applied globally for this controller
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    return this.adminUsersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.adminUsersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User creation payload',
    type: CreateUserDto,
    examples: {
      default: {
        summary: 'Example user',
        value: {
          email: 'admin@example.com',
          password: 'securePass123',
          firstName: 'John',
          lastName: 'Doe',
          role: 'ADMIN',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.adminUsersService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiBody({
    description: 'User update payload',
    type: UpdateUserDto,
    examples: {
      default: {
        summary: 'Update example',
        value: {
          email: 'updated.user@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'USER',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.adminUsersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: UserResponseDto,
  })
  async delete(@Param('id') id: string): Promise<UserResponseDto> {
    return this.adminUsersService.delete(id);
  }
}
