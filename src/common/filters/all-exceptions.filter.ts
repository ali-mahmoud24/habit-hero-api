import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'InternalServerError';

    // Handle known NestJS HttpExceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message || 'Unexpected error';
      error = typeof res === 'string' ? exception.name : (res as any).error || exception.name;
    }

    // Handle Prisma errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        // Unique constraint (duplicate email, etc.)
        status = HttpStatus.CONFLICT;
        message = `Unique constraint failed on: ${exception.meta?.target}`;
        error = 'Conflict';
      } else if (exception.code === 'P2025') {
        // Record not found
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        error = 'NotFound';
      }
    }

    // Development vs Production
    const isDev = process.env.NODE_ENV !== 'production';

    response.status(status).json({
      statusCode: status,
      error,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
      ...(isDev && { stack: (exception as any)?.stack }), // show stack trace only in dev
    });
  }
}
