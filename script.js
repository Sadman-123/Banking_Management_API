const app = require('express')();
const cors = require('cors');
const bdy = require('body-parser');
const DB = require('./db/bankdb');

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
module.exports = app;
