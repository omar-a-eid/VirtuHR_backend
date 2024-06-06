import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
});

export default redis;
