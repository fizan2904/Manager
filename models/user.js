var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	firstname : {
		type : String,
		required : true
	},
	lastname : String,
	username : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	pass : {
		type : String,
		required : true
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.pass, salt, function(err, hash){
			newUser.pass = hash;
			newUser.save(callback);
		});
	});
}

module.exports.comparePassword = function(candidatePass, hash, callback){
	bcrypt.compare(candidatePass, hash, function(err, isMatch){
		if (err) throw err;
		callback(null, isMatch);
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username : username};
	User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email : email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}