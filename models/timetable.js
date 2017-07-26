var mongoose = require('mongoose');

var TableSchema = mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	monday : [{
		time : String,
		class : String,
		sub_code : String
	}],
	tuesday : [{
		time : String,
		class : String,
		sub_code : String
	}],
	wednesday : [{
		time : String,
		class : String,
		sub_code : String
	}],
	thursday : [{
		time : String,
		class : String,
		sub_code : String
	}],
	friday : [{
		time : String,
		class : String,
		sub_code : String
	}]
});

var TimeTable = module.exports = mongoose.model('TimeTable', TableSchema);

module.exports.saveTable = function(newTable, callback){
	newTable.save(callback);
}

module.exports.findTabeleByName = function(name, callback){
	var query = { name : new RegExp('^'+name+'$', "i") }};
	TimeTable.find(query, callback);
}