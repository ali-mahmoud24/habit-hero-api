import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ example: 'clwxy123abc', description: 'Unique user ID' })
  id: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ enum: Role, example: Role.ADMIN })
  role: Role;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2025-09-30T12:34:56.789Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-09-30T12:34:56.789Z' })
  updatedAt: Date;

  @Exclude()
  password: string;
}
