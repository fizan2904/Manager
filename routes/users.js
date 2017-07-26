var router = require('express').Router(),
	User = require('../models/user');

router.post('/register', function(req, res){

	var username = req.body.username,
		firstname = req.body.firstname,
		lastname = req.body.lastname,
		email = req.body.email,
		pass = req.body.pass,
		pass2 = req.body.pass2;

	req.checkBody('username', 'Username cant be blank').notEmpty();
	req.checkBody('email', 'Email cant be blank').notEmpty();
	req.checkBody('pass', 'Passwords do not match').Equals(pass2);

	var errors = req.validationErrors();
	if(errors){
		res.send(errors);
	}else{
		var newUser = new User({
			firstname : firstname,
			lastname : lastname,
			username : username,
			email : email,
			pass : pass
		});

		User.createUser(newUser, function(err){
			if (err) throw err;
			req.flash('success_msg', 'Successfully registered user');
			res.redirect('/dashboard');
		});
	}

});

passport.use(new LocalStrategy(
  function(username, pass, done) {
    User.getUserByUsername(username, function(err, user){
    	if(err) throw err;
    	if(!user){
    		return done(null, false, {message : 'Unknown user'});
    	}
    	User.comparePassword(pass, user.pass, function(err, isMatch){
    		if(err) throw err;
    		if(isMatch){
    			return done(null, user);
    		}else{
    			return done(null, false, {message: 'Password is incorrect'});
    		}
    	});
    });
  }
));

passport.serializeUser(function(user, done) {
	var user = { _id : _id, firstname : firstname, lastname : lastname, username : username, name : firstname + ' ' + lastnamew };
  	done(null, user._id, user);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'Successfully loged out');
});

module.exports = router;

/*var email = req.body.email,
		fname = req.body.fname,
		lname = req.body.lname,
		crede = req.body.crede,
		area = req.body.area,
		phone = req.body.phone*/