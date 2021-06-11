
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas (400,400);

monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(400,350,900,10);
ground.velocityX = -4;
ground.x = ground.width/2;
console.log(ground.x);
  
obstacleGroup = createGroup();
bananaGroup = createGroup();
  
score = 0;
  
}


function draw() {
background("white");
  
if(ground.x < 0){
ground.x = ground.width/2;
}
spawnObstacles();
spawnBanana();

if(keyDown("space")&& monkey.y >= 300){
monkey.velocityY = -12;
}

if(bananaGroup.isTouching(monkey)){
bananaGroup.destroyEach();
score = score+1;
}


monkey.velocityY = monkey.velocityY + 0.5;

monkey.collide(ground);
if(obstacleGroup.isTouching(monkey)){
monkey.velocity = 0;
bananaGroup.velocity = 0;
ground.velocity = 0;
}

drawSprites();
stroke("white");
textSize(20);
fill("white");
text("score: "+score,500,50);
  
stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate());
text("Survival Time: "+ survivalTime, 100,50);
}

function spawnObstacles(){
if(frameCount % 120 === 0){
var obstacles = createSprite(400,315,20,40);
obstacles.addImage(obstacleImage);
obstacles.velocityX = -6;

var rand = Math.round(random(1));
switch(rand){
case 1: obstacles.addImage(obstacleImage);
break;
default: break;
}

obstacles.scale = 0.18;
obstacles.lifetime = 300;

obstacleGroup.add(obstacles);
}
}

function spawnBanana(){
if(frameCount % 160 === 0){
var banana = createSprite(600,100,40,20);
banana.y = Math.round(random(150,200));
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.velocityX = -3;
  
monkey.lifetime = 500;

banana.depth = monkey.depth;
monkey.depyh = monkey.depth + 1;
  
bananaGroup.add(banana);
}
}
