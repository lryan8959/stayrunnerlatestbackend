import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
import { /*CacheInterceptor */ CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
// import { APP_INTERCEPTOR } from '@nestjs/core';


const nodeEnv = process.env.NODE_ENV; // 'development'
const port = process.env.PORT; // '3120'
const mongodbUri = process.env.MONGODB_URI; // MongoDB connection URI
const elasticsearchNode = process.env.ELASTICSEARCH_NODE; // '' (empty string)
const elasticsearchUsername = process.env.ELASTICSEARCH_USERNAME; // 'elastic'
const elasticsearchPassword = process.env.ELASTICSEARCH_PASSWORD; // 'g51i3KXTsBmoZ4ay'
const redisHost = process.env.REDIS_HOST; // 'localhost'
const redisPort = process.env.REDIS_PORT; // '6379'
const redisPassword = process.env.REDIS_PASSWORD; // 'g51i3KTsREDISBmoZ4ay'


@Global()
@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10),
          },
          password: configService.get<string>('REDIS_PASSWORD'),
          ttl: 24 * 60 * 60 * 1000, // Set TTL to 1 day (24 hours) in milliseconds
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR, //For Auto-caching
    //   useClass: CacheInterceptor, //For Auto-caching
    // },
  ],
})
export class CacheRedisModule {}
