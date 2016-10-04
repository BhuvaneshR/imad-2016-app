console.log('Loaded!');
var img=document.getElementById('logo');
var marginLeft=0;
function moveRight()
{
 marginLeft=marginLeft+5;  
 img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
var interval=setInterval(moveRight,50);
};