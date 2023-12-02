import { createClient } from 'redis';

const redisClient = createClient({
  // url: 'redis://localhost:6379',
  url: 'redis://127.0.0.1:6379',
});

// successful connection
redisClient.on('connect', () => {
  console.log('Redis client connected');
});

// errors
redisClient.on('error', err => {
  console.log('Redis client error:', err);
});

// reconnecting
redisClient.on('reconnecting', reconnectParams => {
  console.log(
    `Redis client reconnecting (${reconnectParams.attempt} attempts)...`
  );
});

// successful reconnection
redisClient.on('reconnect', () => {
  console.log('Redis client reconnected');
});

// closes
redisClient.on('end', () => {
  console.log('Redis client connection closed');
});

// connect to redisClient
// redisClient.connect();

export default redisClient;
