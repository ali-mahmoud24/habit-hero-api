export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },

  database: {
    url: process.env.DATABASE_URL ?? '',
  },

  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET ?? 'defaultAccessSecret',
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET ?? 'defaultRefreshSecret',
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION ?? '900s',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION ?? '7d',
  },

  aws: {
    region: process.env.AWS_REGION ?? 'us-east-1',
    s3Bucket: process.env.S3_BUCKET ?? 'default-bucket',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },

  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
});
