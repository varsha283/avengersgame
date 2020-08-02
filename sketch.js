var player1,villain,edges;
var backgroundImg,captinamericaimg,thanosimg,lazerimg,looseimg,lazers;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var scale = 2;
var animationimg;
var reset;
function preload() {
  backgroundImg=loadImage("background.jpg"); 
  //captinamericaimg = loadImage("captin.png");
  //thanosimg=loadImage("Thanos.png");
  lazerimg=loadImage("/images/lazer.png")
  playerimg = loadImage("/images/captin.png")

  looseimg=loadImage("/images/looses.png");
  amimationimg=loadAnimation("/defeat/1.png","/defeat/2.png","/defeat/3.png","/defeat/4.png","/defeat/5.png","/defeat/6.png","/defeat/7.png","/defeat/8.png","/defeat/9.png","/defeat/10.png","/defeat/12.png")
}
function setup(){
  //canvas is created
  canvas=createCanvas(1600,800);

  //player1 is created
  player1 = new player(200,590,200,200);
  player1.sprite.addImage("play",playerimg);
  player1.sprite.addAnimation("loose",looseimg);
  //player1.sprite.addAnimation("",animationimg)
  playerimg.resize(100, 300);
reset = createSprite(20,20,100,100);
 
  player1.sprite.depth = 1;
  player1.sprite.setCollider("rectangle",0,0,100,100)
  lazersgroup= new Group();
  
  
  villain = new Villians(1300,300,200,200);
  villain.sprite.setCollider("rectangle",0,0,100,100)
  villain.sprite.debug=true;
  villain.sprite.depth=1;
  console.log(villain.sprite.depth)
  
    randomvelocity();




}
function draw(){
  background(backgroundImg);
  if(villain.sprite.collide(player1.sprite)){
player1.sprite.changeAnimation("loose")
  }
  if(gameState===PLAY){
    spawnlazers();
   
    attack();
    
    
    if(lazersgroup.collide(player1.sprite)){
      gameState=END
    }
  }

  else if(gameState===END){
picture();

  }
  edges = createEdgeSprites();
  villain.sprite.bounceOff(edges)
 player1.movement();
 player1.sprite.depth =1;
    //player1.display();
    villain.display();
    
  player1.sprite.debug = true;
    
    console.log(player1.sprite.depth);
   
     
       
      
 
  drawSprites();
}

function randomvelocity()
{
    villain.sprite.velocityY = random(-7,7);
}

function spawnlazers(){
  if(frameCount % 40 === 0) {
    var lazers = createSprite(1060,200,10,10);
lazers.depth=1;
    lazers.addToGroup(lazersgroup);
    //lazers.visible=true;
    lazers.debug =true;
    lazers.x=villain.sprite.x;
    lazers.y=villain.sprite.y;
    lazers.addImage(lazerimg)
    lazers.velocityX = -6;
    
    //console.log(lazers.depth);
    
  }

  }

  function picture()
  {
    player1.sprite.changeImage("loose");
    lazersgroup.removeSprites();
    lazersgroup.setVelocityXEach(0);
  }
function attack(){
  if(keyDown("space")){
    
    animation(animationimg,10,10);
  }
}
function resetbutton(){
  if(mousePressedOver(reset)){
    gameState=PLAY;
  }
}
