var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsBottom;
var obsBottomImg1,obsBottomImg2,obsBottomImg3;
var obsTop;
var obsTopImg1,obsTopImg2;
var invisibleGround;
var heartImg;
var coinGroup,obsBottomGroup,obsTopGroup;
var coin,coinImg;
var gameOverImg,restartImg;
var gameOver,restart;
var score = 0;
var gameState="PLAY";
var jumpSound,dieSound,getRewardSound; 

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsBottomImg1 = loadImage("assets/obsBottom1.png");

obsBottomImg2 = loadImage("assets/obsBottom2.png");

obsBottomImg3 = loadImage("assets/obsBottom3.png");

obsTopImg1 = loadImage("assets/obsTop1.png");

obsTopImg2 = loadImage("assets/obsTop2.png");

gameOverImg = loadImage("assets/gameOver.png");

restartImg = loadImage("assets/restart.png");

coinImg = loadImage("assets/coin.png");

jumpSound = loadSound("assets/jump.mp3");

dieSound = loadSound("assets/die.mp3");

getRewardSound = loadSound("assets/getReward.mp3")
}

function setup(){

createCanvas(1000,600);

//background image
bg = createSprite(600,250,1000,500);
bg.addImage(bgImg);
bg.scale = 1;
bg.velocityX=-3;
bg.velocityX=-(3+ score/30);

//creating top and bottom grounds
bottomGround = createSprite(200,590,1800,20);
bottomGround.shapeColor=rgb(150,75,0);

topGround = createSprite(200,110,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,45);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.27;
balloon.debug =false;
balloon.setCollider("rectangle",0,-35,160,470);
//balloon.bounceOff(edges);

gameOver = createSprite(480,200,20,45);
gameOver.addImage(gameOverImg);

restart = createSprite(480,300,20,45);
restart.addImage(restartImg);

coinGroup = new Group();
obsBottomGroup = new Group();
obsTopGroup = new Group();

coin1 = new Rewards(580,70);
}

function draw() {
  background("black");

  drawSprites();

   textSize(22);
   fill("black");
   
   text("Score ="+score,800,70);
   
  if(gameState === "PLAY"){
 
          
          gameOver.visible=false;
          restart.visible=false;

          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;    
            jumpSound.play();
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 1;
              
          // console.log(bg.x);

           if(bg.x<400){
             bg.x = bg.width/2;
             
           }

           // making the balloon collide with bottom ground
           balloon.collide(bottomGround);
           
           if(keyDown("DOWN_ARROW")){
             balloon.y = balloon.y+5;
           }

           if(frameCount%250 === 0){
          
          coin1.display();

           }
         
          if (balloon.isTouching(coinGroup)){
            score=score+10;
            coinGroup.destroyEach();
            getRewardSound.play();
          }   

           if (balloon.isTouching(obsTopGroup) || balloon.isTouching(obsBottomGroup)){
             gameState="END";
             dieSound.play();
          }
        
        spawnTopObs();   
        spawnBottomObs();
        
       }
    else if(gameState ==="END"){
      bg.velocityX=0;
      obsBottomGroup.setVelocityXEach(0)
      obsTopGroup.setVelocityXEach(0);
      coinGroup.setVelocityXEach(0);
      obsBottomGroup.setLifetimeEach(-1);
      obsTopGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      balloon.velocityY=0;
      gameOver.visible=true;
      restart.visible=true;

      if(mousePressedOver(restart)){
        reset();
      }
    }

   
}
  function spawnBottomObs(){
    if(frameCount%200 === 0){
    obsBottom = createSprite(950,465);
    obsBottom.velocityX = -2;
    obsBottom.lifetime = 500;
    obsBottom.velocityX=-(2+ score/30);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:obsBottom.addImage(obsBottomImg1);
      obsBottom.scale = 0.13;
      obsBottom.debug=false;
      break;

      case 2:obsBottom.addImage(obsBottomImg2);
      obsBottom.scale = 0.13;
      obsBottom.debug=false;
      break;

      case 3:obsBottom.addImage(obsBottomImg3);
      obsBottom.scale = 0.12;
      obsBottom.debug=false;
      break;
      default:break;
    }
  obsBottom.depth=balloon.depth; 
  balloon.depth+=1;
  
  obsBottomGroup.add(obsBottom);
    }  
  }

function spawnTopObs(){
if (frameCount%125 === 0){
obsTop = createSprite(950,150);
obsTop.velocityX = -2;
obsTop.lifetime = 500;
obsTop.velocityX=-(2+ score/30);
obsTop.y = Math.round(random(20,200));
var rand = Math.round(random(1,2))
switch(rand){
  case 1:obsTop.addImage(obsTopImg1);
  obsTop.scale = 0.13;
  obsTop.debug=false;
  obsTop.setCollider("rectangle",0,-15,350,270)
  break;

  case 2:obsTop.addImage(obsTopImg2);
  obsTop.scale = 0.28;
  obsTop.debug=false;
  obsTop.setCollider("rectangle",0,-25,150,170)
  break;
  default:break;
}
 obsTopGroup.add(obsTop);
}
   }

function reset(){
  obsTopGroup.destroyEach();
  obsBottomGroup.destroyEach();
  coinGroup.destroyEach();
  gameState ="PLAY";
  score=0;
  gameOver.visible=false;
  restart.visible=false;

}

