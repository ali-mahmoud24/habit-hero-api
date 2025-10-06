import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AdminUsersService } from './admin-users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { SerializeInterceptor } from '@/common/interceptors/serialize.interceptor';
import { UserResponseDto } from './dto/user-response.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import {
  ApiErrorResponsesGetAll,
  ApiErrorResponsesGetOne,
  ApiErrorResponsesCreate,
  ApiErrorResponsesUpdate,
  ApiErrorResponsesDelete,
} from '@/common/decorators/api-error-responses.decorator';

@ApiTags('Admin - Users')
@Controller('admin/users')
// @Roles(Role.ADMIN)
@UseInterceptors(new SerializeInterceptor(UserResponseDto))
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  // GET all
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponseDto],
  })
  @ApiErrorResponsesGetAll()
  async findAll(): Promise<UserResponseDto[]> {
    return this.adminUsersService.findAll();
  }

  // GET one
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiErrorResponsesGetOne('User')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.adminUsersService.findOne(id);
  }

  // POST create
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
  @ApiErrorResponsesCreate('Invalid user data', 'Email already exists')
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.adminUsersService.create(dto);
  }

  // PUT update
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
  @ApiErrorResponsesUpdate('Invalid update payload', 'User not found', 'Email already exists')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
    return this.adminUsersService.update(id, dto);
  }

  // DELETE user
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({
    status: 204,
    description: 'User deleted successfully',
    // type: [UserResponseDto],
  })
  @ApiErrorResponsesDelete('User')
  async delete(@Param('id') id: string): Promise<void> {
    return this.adminUsersService.delete(id);
  }
}
