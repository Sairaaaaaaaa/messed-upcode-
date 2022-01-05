const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var ground;
var rope;
var fruit
var back;
var melon;
var rabbit;
var bunny;
var button
var blink
var eat
var sad
var bksound
var cutsound
var crysound
var eatsound
var airsound
var blow
var muteL
var button2
var button3
var rope2
var rope3
var chain2
var chain3
var isMobile
var canW
var canH

function preload()
{
melon=loadImage("melon.png")
back=loadImage("background.png")
rabbit=loadImage("Rabbit-01.png")
blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sad=loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")
bksound=loadSound("sound1.mp3")
cutsound=loadSound("rope_cut.mp3")
crysound=loadSound("sad.wav")
eatsound=loadSound("eating_sound.mp3")
airsound=loadSound("air.wav")


blink.playing=true 
eat.playing=true
sad.playing=true
sad.looping=false 
eat.looping=false


}

function setup() 
{
 var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile){
    canW=displayWidth
    canH=displayHeight 
    createCanvas(displayWidth+80,displayHeight);
    
  }


else {
  canW=windowWidth
  canH=windowHeight
  createCanvas(windowWidth,windowHeight)
}



  frameRate(80);
  //playing bk sound
  bksound.play()
  bksound.setVolume(0.5)
  engine = Engine.create();
  world = engine.world;
  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20

  bunny=createSprite(170,canH-80,100,100)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("eat", eat)
  bunny.addAnimation("sad",sad)
  bunny.changeAnimation("blink")
  bunny.scale=0.2

  ground = new Ground(200,canH,600,20);
  rope=new Rope (8,{x:40,y:30})


  rope2=new Rope (7,{x:370,y:40})


  rope3=new Rope (4,{x:400,y:220})


  var fruit_options={
    density:0.001
  }
  fruit=Bodies.circle(300,300,20,fruit_options)
  Matter.Composite.add(rope.body,fruit)
  chain=new Link(rope,fruit)
  chain2=new Link(rope2,fruit)
  chain3=new Link(rope3,fruit)



//how to create button and give it an image
button=createImg("cutButton.png")
button.position(20,30)
button.size(100,70)
button.mouseClicked(drop)
//making button 2
button2=createImg("cutButton.png")
button2.position(300,30)
button2.size(100,70)
button2.mouseClicked(drop2)
//making button3
button3=createImg("cutButton.png")
button3.position(360,200)
button3.size(100,70)
button3.mouseClicked(drop3)
//creating the blower button
blow=createImg("blow.png")
blow.position(10,245)
blow.size(100,100)
blow.mouseClicked(airBlow)
//making the mute button 
muteL=createImg("mute.png")
muteL.position(450,20)
muteL.size(50,50)
muteL.mouseClicked(mute)

  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background("PaleVioletRed");
  image (back,0,0,canW,canH)
push()
imageMode(CENTER)
if (fruit!=null){
  image(melon,fruit.position.x,fruit.position.y,70,70)
}
pop()
ground.show();
rope.show()
rope2.show()
rope3.show()
  Engine.update(engine);  

if (collide(fruit,bunny)==true){
  bunny.changeAnimation("eat")
  eatsound.play()
}

if (collide(fruit,ground.body)==true){
  console.log("hi")
  bunny.changeAnimation("sad")
  bksound.stop()
  crysound.play()
  fruit=null
}


drawSprites()
 

}


function drop(){
  cutsound.play()
  rope.break()
  chain.detach()
  chain=null
}




function drop2(){
  cutsound.play()
  rope2.break()
  chain2.detach()
  chain2=null
}





function drop3(){
  cutsound.play()
  rope3.break()
  chain3.detach()
  chain3=null
}

function collide (body,sprite){
  if (body!=null){
    var dis=dist(body.position.x,body.position.y, sprite.position.x,sprite.position.y)
    console.log(dis)
    if (dis<=80){
      World.remove(world,fruit)
      fruit=null
      return true
    }
else { 
return false
}

  }
}

function airBlow (){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.03,y:0})
airsound.play()
}


function mute(){
  if (bksound.isPlaying()){
    bksound.stop()
  }
  else {
    bksound.play()
  }
}