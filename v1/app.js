var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var path=require("path");
var passport=require("passport");
var User=require("./models/user");
var LocalStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");


app.engine("html",require("ejs").renderFile);

mongoose.connect("mongodb://localhost/voters");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require("express-session")({
	secret:"Rusty is the beast cutest dog in the world",
	resave:false,
	saveUninitialized:false,
}));


//var Voters=mongoose.model("Voters",votersSchema);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

//app.use(expressValidator());
//app.use(expressSession({secret:'max',saveUninitialized:false,resave:false}));

app.set("view engine","html");

app.get("/",function(req,res){
	res.render("register");
});
app.get("/login",function(req,res){
	res.render("login");
});

app.get("/secreat",function(req,res){
	res.render("secreat");
});

app.get("/voters",function(req,res){
  User.find({},function(err,allVoters){
   	if(err){
   		console.log(err)
   	}else{
   	 	res.render("voters",{voters:allVoters});
   	}
   });
});

app.post("/login",function(req,res){
	req.body.anumber;
    req.body.rname;
	req.body.gender;
	req.body.idmarks;
	req.body.spwd;
	User.register(new User({AadharNumber:req.body.anumber,username:req.body.rname,Identification:req.body.idmarks}),req.body.spwd,function(err,user){
		if(err){
			console.log(err);
			return res.render("login");
		}
			passport.authenticate("local")(req,res,function(){
			res.redirect("/secreat");
	});
});
});



app.listen(3000,function(){		
	console.log("Project Started");
});