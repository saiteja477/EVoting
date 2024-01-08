var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var votersSchema=new mongoose.Schema({
	AadharNumber:Number,
	name:String,
	Identification:String,
	password:String,
	
});

votersSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",votersSchema);