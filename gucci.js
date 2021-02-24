


var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var sizerate = 0.8
var links=[];
function resizecanvas(){
  var mywidth = window.innerWidth *sizerate ;
  var myheight = window.innerHeight*sizerate;
  ctx.canvas.width = mywidth;
  ctx.canvas.height = myheight;
  }
  window.addEventListener('resize', resizecanvas , false);



var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;


// create an engine
var engine = Engine.create();
var world = engine.world;

// create a renderer
var render = Render.create({
    canvas:myCanvas,
    engine: engine,
    options: {
      height : window.innerHeight * sizerate,
      width : window.innerWidth * sizerate,
      background : 'rgb(208,186,160)',
      wireframes: false
    }
});

// create two boxes and a ground
var circles=[];
var chainlength=22;
var x=0;
var y=0;
var img=0;
var side;
var scale=0.6;
var distance;

for(var i=0;i<14;i++){
  circles.push([]);
  if(i%2==0){x+=42.5*scale;}
  else {x+=170*scale;}

  y=0;
  for(var j=0;j<chainlength;j++){
    distance=60*scale;
    if(i%2==(j/3)%2){img='./images/g2.png'; side='right';}
    else{img='./images/g1.png'; side='left';}
    if(j==0){
      y+=30;
      circles[i][j]=Bodies.circle(x,y,20*scale,{render:{sprite:{texture:img,xScale:scale,yScale:scale}},isStatic:true});
      circles[i][j].side=side;
    }
    else if(j==chainlength-1){
      y+=distance+30;
      circles[i][j]=Bodies.circle(x,y,20*scale,{render:{sprite:{texture:img,xScale:scale,yScale:scale}},isStatic:true});
      circles[i][j].side=side;
    }
    else{
    if(j%3==0){
      y+=distance;
      circles[i][j]=Bodies.circle(x,y,20*scale,{inertia:Infinity,frictionAir:0.1,render:{sprite:{texture:img,xScale:scale,yScale:scale}}});
      circles[i][j].side=side;

    }
    else{
      if(j%3==2) {distance=20*scale;}
      y+=distance;
      circles[i][j]=Bodies.circle(x,y,6*scale,{mass:0.43,option:{wireframes:false},render:{fillStyle:'rgb(85,58,45)'}});
      circles[i][j].side=null;
    }
  }
    circles[i][j].index=[i,j];
    circles[i][j].paired=false;

    distance=distance*0.5
    console.log(i,j,distance);

  World.add(world,circles[i][j]);
  if(j!=0){
    var options={
      bodyA:circles[i][j-1],
      bodyB:circles[i][j],
      length:distance,
      stiffness:0.5,
      render: { visible : false  }
    };
    var constraint = Constraint.create(options);
    World.add(world,constraint);
  }
 }
}

var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
var drop;
Matter.Events.on(mouseConstraint,'startdrag', function(e) {
  drop=e.body;
  for(var i=0;i<links.length;i++){
    if(links[i].bodyA==e.body || links[i].bodyB==e.body){
      World.remove(world,links[i]);
      links[i].bodyA.paired=false;
      links[i].bodyB.paired=false;
      links.splice(i,1);
    }
  }
});



Matter.Events.on(engine,'collisionStart',function(e){
  var pairs = e.pairs;
  a=pairs[0].bodyA;
  b=pairs[0].bodyB;
  if(drop==a || drop==b){
  console.log(a.index,a.paired,b.index,b.paired);
  if(a.paired==false && b.paired==false && a.side!=null && a.side=='left' &&b.side=='right'){
    links.push(Constraint.create({bodyA:pairs[0].bodyA, bodyB:pairs[0].bodyB,length:40*scale,stiffness:0.8,render: { visible : false }}));
    World.add(world,links[links.length-1]);
    a.paired=true;
    b.paired=true;
      }
    }
});


engine.world.gravity.y = 0;
// add all of the bodies to the world
Engine.run(engine);
Render.run(render);
