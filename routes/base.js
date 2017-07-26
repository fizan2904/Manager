var router = require('express').Router();

router.route('/')
	
	.get(function(req, res){
		res.send('base');
	})

	.all(function(req, res){
		res.send('base from different route');
	});

module.exports = router;