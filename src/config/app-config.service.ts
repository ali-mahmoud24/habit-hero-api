import { Injectable } from '@nestjs/common';
import configuration from './configuration';
import { configValidationSchema } from './config.validation';

@Injectable()
export class AppConfigService {
  private readonly envConfig: Record<string, any>;

  constructor() {
    const config = configuration();
    const { error, value } = configValidationSchema.validate(config, { abortEarly: false });
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    this.envConfig = value;
  }

  /**
   * Get a config value by nested key, optionally providing a default value.
   * Example: get<number>('app.port', 3000)
   */
  get<T = any>(key: string, defaultValue?: T): T {
    const keys = key.split('.');
    let result: any = this.envConfig;

    for (const k of keys) {
      if (result[k] === undefined) {
        if (defaultValue !== undefined) return defaultValue;
        throw new Error(`Config key "${key}" is missing`);
      }
      result = result[k];
    }

    return result;
  }
}
