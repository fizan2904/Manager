var router = require('express').Router(),
	User = require('../models/user'),
	UserDetails = require('../models/UserDetails');

router.get('/teachers', function(req, res){
	UserDetails.find({}, 'name degree area', function(err, docs){
		if(err) throw err;
		res.send({docs : docs});
	});
});

router.get('/:name', function(req, res){
	var name = req.params.name;
	UserDetails.find({ name : new RegExp('^'+name+'$', "i") }, 'name degree area', function(err, docs){
		if(err) throw err;
		res.send({ docs : docs });
	});
});

router.get('/:degree', function(req, res){
	var name = req.params.degree;
	UserDetails.find({ degree : { $in : degree } }, 'name degree area', function(err, docs){
		if(err) throw err;
		res.send({ docs : docs });
	});
});

router.get('/:area', function(req, res){
	var area = req.params.area;
	UserDetails.find({ area : { $in : area }}, 'name degree area', function(err, docs){
		if(err) throw err;
		res.send({ docs : docs });
	});
});

module.exports = router;