const mongo=require('mongoose');
mongo.connect('mongodb+srv://sadman:sad%402600@mycluster.phgzxsa.mongodb.net/myflutter');
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