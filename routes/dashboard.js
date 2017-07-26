var router = require('express').Router(),
	UserDetails = require('../models/UserDetails');

function checkAuth(req, res){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect('registration/login');
	}
}

router.post('/details', checkAuth, function(req, res){
	var username = req.session.passport.user.username,
		firstname = req.session.passport.user.firstname,
		name = username+' '+lastname,
		lastname = req.session.passport.user.lastname,
		degree = req.body.degree,
		area = req.body.area;

		degree = degree.split(",").map(function(val){ return val });p
		area = degree.split(",").map(function(val){ return val });

	req.checkBody('degree', 'Degree field cannot be empty').notEmpty();
	req.checkBody('area', 'Area field cannot be empty').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.redirect('/dashboard/details', { errors : errors });
	}else{
		var UserDets = new UserDetails({
			name : name,
			degree : degree,
			area : area
		});

		UserDetails.saveDetails(UserDets, function(err){
			if(err) throw err;
			res.redirect('/dashboard');
		});
	}
});