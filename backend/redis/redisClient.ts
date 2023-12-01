import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', err => {
  console.log('Error ' + err);
});

export default redisClient;
