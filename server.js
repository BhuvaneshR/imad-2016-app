var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
  user:'bhuvaneshr',
  database:'bhuvaneshr',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool = new Pool(config);
app.get('/test-db', function (req, res) {
 
 pool.query('SELECT *FROM test',function(err,result){
     
     if(err)
     {
         res.status(500).send(err.toString());
     }
     else
     {
         res.send(JSON.stringify(result.rows));
     }
 });
});

app.get('/profile.html', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

var counter=0;
app.get('/counter', function(req,res)
{
    counter = counter + 1;
    res.send(counter.toString());
}
);
var names=[];
app.get('/submit-name', function (req, res) {
var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/465346176.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '465346176.jpg'));
});

app.get('/ui/one.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'one.jpg'));
});

app.get('/ui/two.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'two.jpg'));
});


app.get('/ui/tree.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'tree.jpeg'));
});

app.get('/ui/back.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'back.jpeg'));
});


function createtemplate(data){
    var title=data.title;
    var content=data.content;
var htmltemplate=`<!DOCTYPE html>
<html class='back'>
<head>
    <link href='/ui/style.css' rel='stylesheet'/>
    <title>${title}</title>
</head>
<body>
    ${content}
</body>
</html>`
;
return htmltemplate;
}

app.get('/articles/:articlename',function(req,res){
    pool.query("SELECT *FROM article WHERE heading=$1",[req.params.articlename],function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length ===0)
            {
                res.status(404).send('Article not found');
            }
            else
            {
                var articleData=result.rows[0];
                res.send(createtemplate(articleData));
            }
        }
    });
     
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
