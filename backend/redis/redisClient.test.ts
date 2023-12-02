import { describe, expect, it } from 'vitest';

import redisClient from './redisClient';

describe('redisClient', async () => {
  await redisClient.connect();
  // should be able to connect to redis
  it('should be able to connect to redis', () => {
    expect(redisClient.isReady).toBe(true);
  });

  // should be able to set a key
  it('should be able to set a key', async () => {
    const res = await redisClient.hSet('test', { test: 'test' });
    expect(res).toBe(0);
  });

  // should be able to get a key
  it('should be able to get a key', async () => {
    const res = await redisClient.hGet('test', 'test');
    expect(res).toBe('test');
  });
});
