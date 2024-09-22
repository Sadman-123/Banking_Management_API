require('dotenv').config();
const mongo=require('mongoose');
mongo.connect(process.env.dburl);
const Schem=new mongo.Schema(
    {
        "username":String,
        "password":String,
        "time":String,
    }
)
const Mod=mongo.model('city_bank_user',Schem,'city_bank_user');
module.exports=Mod;