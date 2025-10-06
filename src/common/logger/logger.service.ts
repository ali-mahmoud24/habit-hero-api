import { ConsoleLogger, Injectable } from '@nestjs/common';
import { appendLog, logPaths } from './logger.config';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private formatJson(level: string, message: string, context?: string, meta?: Record<string, any>) {
    return JSON.stringify({
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      ...meta,
    });
  }

  log(message: string, context?: string, meta?: Record<string, any>) {
    super.log(message, context);
    appendLog(logPaths.app, this.formatJson('info', message, context, meta));
  }

  warn(message: string, context?: string, meta?: Record<string, any>) {
    super.warn(message, context);
    appendLog(logPaths.app, this.formatJson('warn', message, context, meta));
  }

  error(message: string, stackOrContext?: string | Error, context?: string) {
    const stack = stackOrContext instanceof Error ? stackOrContext.stack : undefined;
    const ctx = typeof stackOrContext === 'string' ? stackOrContext : (context ?? 'App');
    super.error(message, stack, ctx);
    appendLog(logPaths.error, this.formatJson('error', message, ctx, { stack }));
  }

  // Optional: for debug/verbose separation
  debug(message: string, context?: string, meta?: Record<string, any>) {
    super.debug(message, context);
    appendLog(logPaths.app, this.formatJson('debug', message, context, meta));
  }

  verbose(message: string, context?: string, meta?: Record<string, any>) {
    super.verbose(message, context);
    appendLog(logPaths.app, this.formatJson('verbose', message, context, meta));
  }

  // Special handler for HTTP middleware logs
  http(message: string, context?: string, meta?: Record<string, any>) {
    if (process.env.NODE_ENV !== 'production') {
      super.log(`${message}`, context);
    }
    appendLog(logPaths.http, this.formatJson('info', message, context, meta));
  }
}
