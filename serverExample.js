const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const renderIndex = function (req, res) {
  console.warn(__dirname + '/app/' + 'index.tpl.html');
  res.sendFile(path.join(__dirname, '/app/', 'index.tpl.html'));
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/')));

// dimension routes and index, landing
app.get('/', renderIndex);
app.get('/infl', renderIndex);
app.get('/wa', renderIndex);

app.get('/wb', renderIndex);
app.get('/wc', renderIndex);
app.get('/wd', renderIndex);
app.get('/landing', renderIndex);
app.get('/wm', renderIndex);

// secondary screens
app.get('/ptim', renderIndex);
app.get('/imulte', renderIndex);
app.get('/pct', renderIndex);

// insights/drivers 
app.get('/ds/d1', renderIndex);
app.get('/ds/d2', renderIndex);
app.get('/ds/d3', renderIndex);
app.get('/ds/d4', renderIndex);
app.get('/ds/d5', renderIndex);
app.get('/ds/d6', renderIndex);
app.get('/ds/d7', renderIndex);
app.get('/ds/d8', renderIndex);
app.get('/ds/d9', renderIndex);
app.get('/ds/d10', renderIndex);

app.get('/instagram', renderIndex);

// practice routes - for post
app.get('/writeto', renderIndex);

app.post('/user.json', function (req, res) {
  console.warn('this comment')
  const userDatas = JSON.stringify({
    nameOfComponent: req.body.nameOfComponent || null,
    elapsedTime: req.body.elapsedTime || null
 });

  fs.appendFile('user.json', userDatas, err => {
    if (err) throw err;
    console.log('Added to the file');
  })
  res.send(userDatas);

});

app.listen(3000, function () {
  console.log('Your app listening on port 3000!')
});