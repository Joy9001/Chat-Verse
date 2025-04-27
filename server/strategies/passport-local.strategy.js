import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { comparePassword } from '../helpers/password.helper.js'
import User from '../models/users.model.js'

passport.serializeUser((user, done) => {
	// console.log('Inside Serialize User', user)
	// We still only serialize the user's ID into the session
	done(null, user._id) // Pass only the ID to be stored
})

passport.deserializeUser(async (id, done) => { // Receive the ID directly
	// console.log('Inside Deserialize User', id)
	try {
		// Find the user by ID and select necessary fields, excluding password
		const user = await User.findById(id).select('-password');
		if (!user) {
			return done(new Error('User not found during deserialization'));
		}

		// Pass the full user object (minus password) to be attached to req.user
		done(null, user)
	} catch (err) {
		done(err, null)
	}
})

export default passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => { // Changed 'username' to 'email' for clarity
			try {
				// Find user by email, keep password for comparison
				const user = await User.findOne({ email: email })
				if (!user) {
					return done(null, false, { message: 'User not found' }); // Use standard Passport args
				}

				const isPasswordMatch = await comparePassword(password, user.password)
				if (!isPasswordMatch) {
					return done(null, false, { message: 'Invalid credentials' }); // Use standard Passport args
				}

				// Password matches, prepare user object without password for the done callback
				const userForCallback = {
					_id: user._id,
					name: user.name,
					username: user.username,
					email: user.email,
					avatar: user.avatar,
					gender: user.gender,
					// Add any other necessary fields
				};

				return done(null, userForCallback) // Pass the necessary user info
			} catch (err) {
				console.log('Error in Local Strategy: ', err.message)
				return done(err, null) // Pass error to done
			}
		}
	)
)
