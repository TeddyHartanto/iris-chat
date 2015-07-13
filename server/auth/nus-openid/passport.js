var passport = require('passport'),
	NusStrategy = require('passport-nus-openid').Strategy;

module.exports.setup = function(User, config) {
	passport.use(new NusStrategy({
		returnURL: config.nusOpenId.returnURL,
		realm: config.nusOpenId.realm,
		profile: true
	},
	function(identifier, profile, done){
		console.log("verify callback!");
		User.findOne({
			'nusOpenId.id': profile.id
		},
		function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				user = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					role: 'user',
					username: profile.username,
					provider: 'nus-openid',
					nusOpenId: profile._json
				});
				user.save(function(err) {
					if (err) done(err);
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		});
	}
	));
};