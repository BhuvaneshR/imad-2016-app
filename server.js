var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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

var articles={
   'articleone':{
    title:'Article One',
    content:`
<div>
       <a href='/' class='button'>Home</a>
       <a href='/profile.html' class='button'>profile</a>
       <a href='/articletwo' class='button'>Article two</a>
       <a href='/articlethree' class='button'>Article three</a>
</div>
<div>
       <p>October 30</p>
</div>
<div>
       <p>This is my first article</p>
</div>
<div>
       <a href='https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fpixabay.com%2Fstatic%2Fuploads%2Fphoto%2F2015%2F04%2F04%2F19%2F13%2Fone-706897_640.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fen%2Fone-1-number-design-collection-706897%2F&docid=Dxk_1n6Yd4M41M&tbnid=H9VLy5g15akogM%3A&w=640&h=640&hl=en&bih=659&biw=1366&ved=0ahUKEwiF5ruwy4LQAhXIK48KHYslB3AQMwg-KAwwDA&iact=mrc&uact=8' target='_blank'><img src='/ui/one.jpg' alt='article one' class='img-medium'/></a>
</div>`
},
   'articletwo':{
       title:'Article Two',
       content:`     <div>
<a href='/' class='button'>Home</a>
<a href='/profile.html' class='button'>profile</a>
<a href='/articleone' class='button'>Article one</a>
<a href='/articlethree' class='button'>Article three</a>
</div>
<div>
<p>October 30</p>
</div>
<div>
<p>This is my second article</p>
</div>
<div>
<a href='https://www.google.co.in/imgres?imgurl=http%3A%2F%2Fwww.atvtoday.co.uk%2Fwp-content%2Fuploads%2F2014%2F03%2Fbbc-two.jpg&imgrefurl=http%3A%2F%2Fwww.atvtoday.co.uk%2F7483-bbc%2F&docid=oR48HW34-OwJFM&tbnid=03ZQgjlRbkXV4M%3A&w=874&h=339&hl=en&bih=659&biw=1366&ved=0ahUKEwizmrifzILQAhWIu48KHe9dAYsQMwhbKB4wHg&iact=mrc&uact=8' target='_blank'><img src='/ui/two.jpg' alt='article two' class='img-medium'/></a>
</div>`
   },
   'articlethree':{
       title:'Article Three',
       content:`
       <div>
<a href='/' class='button'>Home</a>
<a href='/profile.html' class='button'>profile</a>
<a href='/articleone' class='button'>Article one</a>
<a href='/articletwo' class='button'>Article two</a>
</div>
<div>
<p>October 30</p>
</div>
<div class='three'> 
<div class='para'>
<p>This is my third article This is my third article This is my third article This is my third article
   This is my third article This is my third article This is my third article This is my third article
   This is my third article This is my third article This is my third article This is my third article
   This is my third article This is my third article This is my third article This is my third article
   </p>
   </div>
</div>`

   }
};
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

app.get('/:articlename',function(req,res){
    var articlename=req.params.articlename;
     res.send(createtemplate(articles[articlename]));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
