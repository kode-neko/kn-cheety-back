import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
  message: 'Has hecho 100 peticiones en 24h',
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
