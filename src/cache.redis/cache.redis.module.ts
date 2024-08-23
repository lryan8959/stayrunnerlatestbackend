import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
    }),
    CacheModule.registerAsync<CacheModuleOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<CacheModuleOptions> => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10),
          },
          password: process.env.REDIS_PASSWORD,
          ttl: 24 * 60 * 60, // Set TTL to 1 day (24 hours) in seconds
        }) as any, // Cast to any to bypass type issues
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class CacheRedisModule {}
