import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	limit: 20,
	message: 'Too many requests from this IP, please try again after 5 minutes',
})

export { limiter }
