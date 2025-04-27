import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/users.model.js'
dotenv.config()

// Helper to generate a simple username from email
const generateUsernameFromEmail = (email) => {
	return email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') + Math.floor(Math.random() * 1000);
};

export default passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
			scope: ['email', 'profile'],
			state: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log('profile in google: ', profile)
			const googleId = profile.id
			const name = profile.displayName
			const email = profile.emails?.[0]?.value
			const avatar = profile.photos?.[0]?.value
			const provider = profile.provider

			if (!email) {
				return done(new Error('Email not provided by Google.'), false);
			}

			try {
				let user = await User.findOne({ email: email });

				if (!user) {
					user = await User.findOne({ providerId: googleId });
				}

				if (!user) {
					console.log('Creating new user via Google:', email)
					const username = generateUsernameFromEmail(email);
					const newUser = new User({
						name,
						email,
						username,
						avatar: avatar || '',
						gender: 'other',
						providerId: googleId,
						provider,
					})
					user = await newUser.save()
					console.log('New user created:', user);
				} else if (!user.providerId) {
					console.log('Linking Google account to existing user:', email);
					user.providerId = googleId;
					user.provider = provider;
					if (!user.avatar && avatar) {
						user.avatar = avatar;
					}
					user = await user.save();
				}

				const userForSession = {
					_id: user._id,
					name: user.name,
					username: user.username,
					email: user.email,
					avatar: user.avatar,
					gender: user.gender,
				};

				return done(null, userForSession);

			} catch (error) {
				console.error('Error in GoogleStrategy: ', error.message)
				return done(error, false)
			}
		}
	)
)
