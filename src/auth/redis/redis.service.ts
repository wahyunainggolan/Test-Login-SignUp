import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly redisUrl = "redis://0.0.0.0:6379";
  private _redisClient: RedisClientType;

  async onModuleInit() {
    const redisClient = createClient({ url: this.redisUrl });
    await redisClient.connect();
    redisClient.on('error', (...errors) => this.handleRedisError(...errors));
    this._redisClient = <RedisClientType>redisClient;
  }

  get client(): RedisClientType {
    return this._redisClient;
  }

  private handleRedisError(...errors: any[]) {
    console.log(errors);
  }
}