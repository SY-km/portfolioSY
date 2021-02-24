var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


var offcanvas = document.createElement("canvas");
var offctx = offcanvas.getContext("2d");

var offcanvas2 = document.createElement("canvas");
var offctx2 = offcanvas2.getContext("2d");



var patterns=[];
var canvasrate = 0.8;
var sizerate = 0.3;
var widthn = 5;
var heightn = 5;

cir='./images/cir.png';
lu='./images/lu.png';
f='./images/f.png';
f2='./images/f2.png';

for(i=0;i<heightn;i++){
  patterns.push([]);
  for(var j=0;j<widthn;j++){
  if(i%2==0){
      patterns[i].push(new Pattern(f,204));
      patterns[i][j].x=j*113;
      patterns[i][j].y=i*75;
    }
  else if(i%4==1){
    if(j%2==0){
      patterns[i].push(new Pattern(f2,269));
    }
    else{
      patterns[i].push(new Pattern(lu,290));
    }
    patterns[i][j].x=40+j*113;
    patterns[i][j].y=i*75;
  }
  else{
    if(j%2==0){
      patterns[i].push(new Pattern(cir,213));
    }
    else{
      patterns[i].push(new Pattern(f2,269));
    }
    patterns[i][j].x=40+j*113;
    patterns[i][j].y=i*75;
    }
  }
}

function randomcolor(){
  colors=['rgb(67,55,49)','rgb(150,124,84)','rgb(224,182,62)','rgb(23,46,160)','rgb(247,207,190)','rgb(212,101,157)','rgb(127,213,244)','rgb(254,247,104)','rgb(221,247,225)','rgb(194,172,232)','rgb(226,80,148)','rgb(231,85,43)','rgb(208,235,172)','rgb(65,144,51)','rgb(122,63,239)'];
  color=colors[getRandomInt(0,colors.length-1)];
  console.log(color);
  return color;
}

function getRandomInt(min, max ,exept) {
  var result=Math.floor(Math.random() * (max - min + 1)) + min;
  if(result!=exept){
  return result;
    }
  else{return getRandomInt(min,max,exept);}
}

function randomindex(exept){
  return [getRandomInt(0,heightn-1),getRandomInt(0,widthn-1),exept];
}

function alpha(){
  for(i=0;i<heightn;i++){
    for(j=0;j<widthn;j++){
      if(patterns[i][j].state==0){
        if(patterns[i][j].alpha>5){
          patterns[i][j].alpha=1;
          patterns[i][j].state=1;
          }
        else{
          patterns[i][j].alpha=parseFloat((patterns[i][j].alpha+0.025).toFixed(2));
        }
      }

      else if(patterns[i][j].state==1){
        if(patterns[i][j].alpha<0){
         patterns[i][j].alpha=0;
         patterns[i][j].state=3;
      }
      else{patterns[i][j].alpha=parseFloat((patterns[i][j].alpha-0.01).toFixed(2));}
    }
  }
}
}

function Pattern(type,size) {
  this.type = new Image();
  this.type.src=type;
  this.alpha = 0;
  this.color = '';
  this.state = 3;
  this.size = size;
}

function resizecanvas(){
  var mywidth = window.innerWidth *canvasrate ;
  var myheight = window.innerHeight*canvasrate;
  offctx.canvas.width = mywidth;
  offctx.canvas.height = myheight;
  offctx2.canvas.width = mywidth;
  offctx2.canvas.height = myheight;
  ctx.canvas.width = mywidth;
  ctx.canvas.height = myheight;
  }
  window.addEventListener('resize', resizecanvas , false);


function drawall(){
  var i,j=0;
  for(i=0;i<heightn;i++){
    for(j=0;j<widthn;j++){
        if(patterns[i][j].alpha>0){
          if (patterns[i][j].alpha>1){
              offctx2.globalAlpha=1;
              }
          else{
              offctx2.globalAlpha=patterns[i][j].alpha;
            }
          offctx.fillStyle = patterns[i][j].color;
          offctx2.drawImage(patterns[i][j].type,patterns[i][j].x,patterns[i][j].y,patterns[i][j].size*sizerate,patterns[i][j].size*sizerate);
          offctx.fillRect(patterns[i][j].x,patterns[i][j].y,patterns[i][j].size*sizerate,patterns[i][j].size*sizerate);

      }
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(offcanvas2,0,0);
    ctx.globalCompositeOperation = "source-in";
    ctx.drawImage(offcanvas,0,0);
  }


}

var t=0;
var exept=0;
var animate = function () {
   ctx.clearRect(0,0,canvas.width,canvas.height);
   offctx.clearRect(0,0,offcanvas.width,offcanvas.height);
   offctx2.clearRect(0,0,offcanvas2.width,offcanvas2.height);
   if(t%90==0){
     var ind= randomindex(exept);
     exept=ind;
     patterns[ind[0]][ind[1]].state=0;
     patterns[ind[0]][ind[1]].color=randomcolor();
   }
   alpha();
   drawall();
   t+=1;
   if(t<1500){
   requestAnimationFrame(animate);
      }
  };




  /*

  */
