import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

interface ApiQueryParamsOptions {
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  filter?: Record<string, any>;
}

export function ApiQueryParams(options?: ApiQueryParamsOptions) {
  const decorators: Array<MethodDecorator | ClassDecorator> = [];

  // Page
  decorators.push(
    ApiQuery({
      name: 'page',
      required: false,
      description: 'Page number',
      type: Number,
      example: options?.page ?? 1,
    }),
  );

  // Limit
  decorators.push(
    ApiQuery({
      name: 'limit',
      required: false,
      description: 'Number of results per page',
      type: Number,
      example: options?.limit ?? 20,
    }),
  );

  // Sort
  decorators.push(
    ApiQuery({
      name: 'sort',
      required: false,
      description: 'Sort field and order, comma separated',
      type: String,
      example: options?.sort ?? 'email,asc',
    }),
  );

  // Fields
  decorators.push(
    ApiQuery({
      name: 'fields',
      required: false,
      description: 'Comma separated list of fields to return',
      type: String,
      example: options?.fields ?? 'email,firstName',
    }),
  );

  // Filter
  decorators.push(
    ApiQuery({
      name: 'filter',
      required: false,
      description: 'Filter object',
      type: Object,
      example: options?.filter ?? { role: 'ADMIN' },
    }),
  );

  return applyDecorators(...decorators);
}
