import jwt from 'jsonwebtoken';
import passport from 'passport';
import Auth from '../models/auth.model.js';

export const isAuthenticated = (req, res, next) => {
	console.log('req url', req.url);
	console.log('req user', req.user);

	if (req.isAuthenticated()) {
		console.log('Inside req.isAuthenticated checkpoint');
		return next();
	} else {
		console.log('Inside else checkpoint');
	}

	passport.authenticate('jwt', async (err, user, info) => {
		if (err) {
			console.error('Error in isAuthenticated: ', err.message);
			return res.status(500).json({ error: 'Internal Server Error' });
		}

		if (user) {
			const userSession = {
				_id: user._id,
			};
			req.user = userSession;
			return next();
		}

		if (info?.message === 'No auth token') {
			try {
				const refreshToken = req.cookies.refreshToken;

				if (!refreshToken) {
					console.log('No refresh token exists');
					if (req.url === '/login' || req.url === '/register') {
						return next();
					}
					return res.redirect('/auth/login');
				}

				const refreshtokendb = await Auth.findOne({
					refreshToken: refreshToken,
				});
				if (!refreshtokendb) {
					console.log('Refresh token not found');
					if (req.url === '/login' || req.url === '/register') {
						return next();
					}
					return res.redirect('/auth/login');
				}

				// Directly use the refresh token without decryption
				const decoded = jwt.verify(
					refreshToken,
					process.env.REFRESH_TOKEN_SECRET
				);

				if (refreshtokendb.user.toString() !== decoded.user) {
					return res.status(403).json({
						error: 'Access Forbidden. Invalid refresh token',
					});
				}

				// Check if the refresh token is older than 1 day (24 hours)
				if (
					Date.now() - refreshtokendb.updatedAt.getTime() >
					1000 * 60 * 60 * 24
				) {
					const newRefreshToken = jwt.sign(
						{ user: decoded.user },
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: '7d',
						}
					);
					refreshtokendb.refreshToken = newRefreshToken;
					await refreshtokendb.save();

					res.cookie('refreshToken', newRefreshToken, {
						httpOnly: true,
						secure: true,
						sameSite: 'strict',
						maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
					});
				}

				const accessToken = jwt.sign(
					{ user: decoded.user },
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: '30m',
					}
				);
				res.cookie('accessToken', accessToken, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					maxAge: 1000 * 60 * 30, // 30 minutes
				});

				const userSession = {
					_id: decoded.user,
				};
				req.user = userSession;
				return next();
			} catch (error) {
				console.error('Error in refresh token handling: ', error.message);
				return res.status(500).json({ error: 'Internal Server Error' });
			}
		}

		console.log('Info in isAuthenticated: ', info.message);
		next();
	})(req, res, next);
};
