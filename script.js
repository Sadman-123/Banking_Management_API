const app=require('express')();
const cors=require('cors');
const bdy=require('body-parser');
const DB=require('./db/bankdb');
app.use(cors());
app.use(bdy.urlencoded({extended:true}));
app.use(bdy.json());
app.post('/insert',async (req,res)=>{
    const lol=new DB({
        time:req.body.time,
        add:req.body.add,
        money_transfer:req.body.money_transfer,
        name:req.body.name
    });
    await lol.save()
    .then(()=>res.status(200).send('Inserted'))
    .catch(e=>console.log(e))
})
app.get('/api/:nm',async (req,res)=>{
    const lox=await DB.find({
        name:req.params.nm
    })
    .then((dat)=>{
        res.status(200).json(dat)
    })
    .catch(e=>console.log(e))
})
app.listen(3000,()=>console.log('Listening'))