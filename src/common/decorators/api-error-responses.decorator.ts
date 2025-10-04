import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

// ✅ Helper for 500 (always possible)
function ApiInternalError(description = 'Internal Server Error') {
  return ApiResponse({
    status: 500,
    description,
    type: ErrorResponseDto,
    examples: {
      internalError: {
        summary: 'Unexpected server error example',
        value: {
          statusCode: 500,
          error: 'InternalServerError',
          message: 'An unexpected error occurred while processing the request',
          path: '/admin/users',
          timestamp: new Date().toISOString(),
          stack: 'Error: Cannot read properties of undefined (reading "email")',
        },
      },
      databaseError: {
        summary: 'Database connection error example',
        value: {
          statusCode: 500,
          error: 'InternalServerError',
          message: 'Database connection failed. Please try again later.',
          path: '/admin/users',
          timestamp: new Date().toISOString(),
        },
      },
    },
  });
}

// ✅ GET ALL: only 500
export function ApiErrorResponsesGetAll(description500?: string) {
  return applyDecorators(ApiInternalError(description500));
}

// ✅ GET ONE: 404 + 500
export function ApiErrorResponsesGetOne(entity: string, description500?: string) {
  return applyDecorators(
    ApiResponse({
      status: 404,
      description: `${entity} not found`,
      type: ErrorResponseDto,
      examples: {
        notFound: {
          summary: `${entity} not found example`,
          value: {
            statusCode: 404,
            error: 'NotFound',
            message: `${entity} not found`,
            path: `/admin/${entity.toLowerCase()}s/123`,
            timestamp: new Date().toISOString(),
          },
        },
      },
    }),
    ApiInternalError(description500),
  );
}

// ✅ POST (create): 400, 409, 500
export function ApiErrorResponsesCreate(
  badRequestDesc = 'Validation failed',
  conflictDesc = 'Conflict (e.g. duplicate entry)',
  description500?: string,
) {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: badRequestDesc,
      type: ErrorResponseDto,
      examples: {
        validationError: {
          summary: 'Validation failed example',
          value: {
            statusCode: 400,
            error: 'BadRequest',
            message: 'Validation failed: email must be a valid email address',
            path: '/admin/users',
            timestamp: new Date().toISOString(),
          },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: conflictDesc,
      type: ErrorResponseDto,
      examples: {
        duplicate: {
          summary: 'Duplicate entry example',
          value: {
            statusCode: 409,
            error: 'Conflict',
            message: 'Unique constraint failed on: email',
            path: '/admin/users',
            timestamp: new Date().toISOString(),
          },
        },
      },
    }),
    ApiInternalError(description500),
  );
}

// ✅ PUT (update): 400, 404, 409, 500
export function ApiErrorResponsesUpdate(
  badRequestDesc = 'Validation failed',
  notFoundDesc = 'Resource not found',
  conflictDesc = 'Conflict (duplicate entry)',
  description500?: string,
) {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: badRequestDesc,
      type: ErrorResponseDto,
      examples: {
        validation: {
          summary: 'Invalid update data example',
          value: {
            statusCode: 400,
            error: 'BadRequest',
            message: 'firstName must be shorter than or equal to 50 characters',
            path: '/admin/users/123',
            timestamp: new Date().toISOString(),
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: notFoundDesc,
      type: ErrorResponseDto,
      examples: {
        notFound: {
          summary: 'Not found example',
          value: {
            statusCode: 404,
            error: 'NotFound',
            message: notFoundDesc,
            path: '/admin/users/123',
            timestamp: new Date().toISOString(),
          },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: conflictDesc,
      type: ErrorResponseDto,
      examples: {
        duplicate: {
          summary: 'Duplicate entry example',
          value: {
            statusCode: 409,
            error: 'Conflict',
            message: 'Email already exists',
            path: '/admin/users/123',
            timestamp: new Date().toISOString(),
          },
        },
      },
    }),
    ApiInternalError(description500),
  );
}

// ✅ DELETE: 404, 500
export function ApiErrorResponsesDelete(entity: string, description500?: string) {
  return applyDecorators(
    ApiResponse({
      status: 404,
      description: `${entity} not found`,
      type: ErrorResponseDto,
      examples: {
        notFound: {
          summary: `${entity} not found example`,
          value: {
            statusCode: 404,
            error: 'NotFound',
            message: `${entity} not found`,
            path: `/admin/${entity.toLowerCase()}s/123`,
            timestamp: new Date().toISOString(),
          },
        },
      },
    }),
    ApiInternalError(description500),
  );
}
