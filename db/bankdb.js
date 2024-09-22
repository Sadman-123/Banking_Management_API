require('dotenv').config();
const mongo=require('mongoose');
mongo.connect(process.env.dburl);
const Schem=new mongo.Schema(
    {
        "money_transfer":Number,
        "add":Boolean,
        "time":String,
        "name":String
    }
)
const Mod=mongo.model('city_bank',Schem,'city_bank');
module.exports=Mod;