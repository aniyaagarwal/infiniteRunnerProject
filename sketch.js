var rex, rexImg, rexGroup
var potato, potatoImg
var ground
var gameState = "start"
var score = 0

function preload(){
  rexImg = loadImage("assets/rex.png")
  potatoImg = loadImage("assets/mrPotatoHead.png")

}

function setup() {

  createCanvas(windowWidth-10, windowHeight-10);

  potato = createSprite(200, height-150)
  potato.addImage(potatoImg)
  potato.scale = 0.4
  
  ground = createSprite(width/2, height-20, width, 50)
  ground.shapeColor = "white"

  rexGroup = new Group();
}

function draw() {

  background(0);

  potato.collide(ground)

  if (gameState == "start"){
    start()
  } else if (gameState == "play"){
    play()
  } else if (gameState == "end"){
    end()
  }
  fill("white")
  textSize(20)
  text("Score = "+ score, width-150, 50)
 
   drawSprites()
}

function start(){
  potato.x = 200
  potato.y = height-150

  if (keyDown("space")){
    gameState = "play"
  }
}

function play(){
  makeRex()

  if (frameCount % 5 == 0){
    score += 1
  }

  if (keyDown(UP_ARROW) && potato.y > height/2){
    potato.velocityY = -5
  }
  potato.velocityY += 1

  if (rexGroup.isTouching(potato)){
    gameState = "end"
  }

}

function end(){
  potato.velocityY = 0
  rexGroup.destroyEach();
  
}

function makeRex(){
  if (frameCount % 100 == 0){
    rex = createSprite(width, height-100)
    rex.addImage (rexImg)
    rex.scale = 0.15
    rex.velocityX = -4
    rexGroup.add(rex)
  }

}