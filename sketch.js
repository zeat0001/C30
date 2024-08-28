const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;
var canvas
var angle, cannon;
var cannonBall;
var balls = [];
function preload(){
 backgroundImg = loadImage("./assets/background.gif");
}


function setup() {
  //createCanvas(400,400);
  canvas = createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  angle = -PI/4
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180,110,100,50,angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);

  /*rectMode(CENTER);
  ellipseMode(RADIUS);*/
}

function draw() 
{
  background(51);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);
  tower.display();
  cannon.display();
  //cannonBall.display();
  for(var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i], i);
  }

}

//funcion para mostrar la bala
function showCannonBalls(ball, index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height -50 ){
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}
function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }
}
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}