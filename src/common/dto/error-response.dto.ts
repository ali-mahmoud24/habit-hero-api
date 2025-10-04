import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'NotFound' })
  error: string;

  @ApiProperty({
    example: 'Record not found',
    description: 'Human-readable error message',
  })
  message: string | string[];

  @ApiProperty({ example: '/admin/users/123' })
  path: string;

  @ApiProperty({ example: '2025-10-04T12:00:00.000Z' })
  timestamp: string;

  @ApiProperty({
    example: 'Error stack trace (only in development)',
    required: false,
  })
  stack?: string;
}
