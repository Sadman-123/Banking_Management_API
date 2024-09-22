require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const bdy = require('body-parser');
const DB = require('./db/bankdb');
const userDB=require('./db/userdb');
const bcrypt=require('bcrypt');
app.use(cors());
app.use(bdy.urlencoded({ extended: true }));
app.use(bdy.json());
app.post('/insert', async (req, res) => {
  const lol = new DB({
    time: req.body.time,
    add: req.body.add,
    money_transfer: req.body.money_transfer,
    name: req.body.name,
  });
  try {
    await lol.save();
    res.status(200).send('Inserted');
  } catch (e) {
    console.log(e);
    res.status(500).send('Error');
  }
});

app.get('/api/:nm', async (req, res) => {
  try {
    const data = await DB.find({ name: req.params.nm });
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('Error');
  }
});
app.get('/api/sum/:nm', async (req, res) => {
  try {
    const data = await DB.aggregate([
      { $match: { name: req.params.nm } },
      {
        $group: {
          _id: "$name",
          total_transfer: {
            $sum: {
              $cond: { if: { $eq: ["$add", true] }, then: "$money_transfer", else: { $multiply: ["$money_transfer", -1] } }
            }
          }
        }
      }
    ]);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('Error');
  }
});
app.listen(process.env.port,()=>{console.log(`Listening ${process.env.port}`)})

app.post('/register',async (req,res)=>{
  const {username,password}=req.body;
  try{
    const user=await userDB.findOne({username:username});
    if(user)
    {
      return res.status(400).send("User Already Exists")
    }
    bcrypt.hash(password, 10, async function(err, hash) {
      const newuser=new userDB({
        username:username,
        password:hash,
        time:new Date().toUTCString()
      })
      await newuser.save()
      res.status(200).send("User Created")
  });
  }
  catch{
    res.status(400).send('Something went wrong')
  }

});
