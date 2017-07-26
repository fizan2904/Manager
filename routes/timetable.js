var router = require('express').Router(),
	TimeTable = require('../models/timetable');

function getday(){
	var d = new Date(),
	weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	var n = weekday[d.getDay()];
	return n;
}

function isAuth(req, res){
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash('error_msg', 'Login to continue');
		res.redirect('/teacher/login');
	}
}

router.get('/timetable/:name', function(req, res){
	var name = req.params.name;
	TimeTable.findTabeleByName(name, function(err, docs){
		if (err) throw err;
		res.send({ table : docs });
	});
});

router.get('/timetable/:name/:day', function(req, res){
	var name = req.params.name,
		day = req.params.day;
	TimeTable.findTabeleByName(name, function(err, docs){
		if (err) throw err;
		res.send({ dayOrder : docs.day });
	});
});

router.post('/saveTimeTable', isAuth, function(req, res){
	var name = req.session.passport.user.name,
		i = 0,
		monday = req.body.monday,
		tuesday = req.body.tuesday,
		wednesday = req.body.wednesday,
		thursday = req.body.thursday,
		friday = req.body.friday;
	monday = monday.split(";").map(function(val){ return val; });
	tuesday = tuesday.split(";").map(function(val){ return val; });
	wednesday = wednesday.split(";").map(function(val){ return val; });
	thursday = thursday.split(";").map(function(val){ return val; });
	friday = friday.split(";").map(function(val){ return val; });

	for(i=0;i<=monday.length;i++){
		var obj = new Array();
		mondayObjArr[i] = monday[i].split(",").map(function(val){ return val; });
	}
	for(i=0;i<=tuesday.length;i++){
		var obj = new Array();
		tuesdayObjArr[i] = tuesday[i].split(",").map(function(val){ return val; });
	}
	for(i=0;i<=wednesday.length;i++){
		var obj = new Array();
		wednesdayObjArr[i] = wednesday[i].split(",").map(function(val){ return val; });
	}
	for(i=0;i<=thursday.length;i++){
		var obj = new Array();
		thursdayObjArr[i] = thursday[i].split(",").map(function(val){ return val; });
	}
	for(i=0;i<=friday.length;i++){
		var obj = new Array();
		fridayObjArr[i] = friday[i].split(",").map(function(val){ return val; });
	}

	var finalData = new TimeTable({
		name : name,
		monday : mondayObjArr,
		tuesday : tuesdayObjArr,
		wednesday : wednesdayObjArr,
		thursday : thursdayObjArr,
		friday : fridayObjArr
	});

	TimeTable.saveTable(finalData, function(err){
		if (err) throw err;
		res.redirect('/timetable/timetable/'+name);
	});

});

module.exports = router;