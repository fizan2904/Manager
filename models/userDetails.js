var mongoose = require('mongoose');

var UserDetailsSchema = mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	degree : [String],
	area : [String]
});

var UserDetails = module.exports = mongoose.model('UserDetails', UserDetailsSchema);

UserDetails.saveDetails = function(details, callback){
	details.save(callback);
}