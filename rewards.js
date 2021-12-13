class Rewards{
constructor(x,y){
this.width=10;
this.height=10;
this.x=x;
this.y=y;

}
display(){
coin=createSprite(this.x,this.y,this.width,this.height);
coin.velocityX = -2;
coin.velocityX=-(2+ score/30);
coin.addImage("coin",coinImg);
coin.scale = 0.2;
coinGroup.add(coin);
}

}