var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":4,"version":"xoaAIgxSF_DC_FDVmSRrPkJkDU6qC4gz","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"z0h6cYEQjxa30nx0tS8jYxUiyBrpxLUX","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"rI1z_bAUgjrNx5lUXM227bYZcPnMqs0s","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

var monkey = createSprite(60,340,20,20);
monkey.setAnimation("monkey");
monkey.scale = 0.1;

var ground=createSprite(200,360,800,05);
ground.velocityX = -4;
ground.x = ground.width/2;

var bananaGroup = createGroup();
var obstacleGroup = createGroup();

var survivaltime = 0;


function draw() {
  background("lightblue");
  
  if(gameState === PLAY){
    
     survivaltime = Math.ceil(World.frameCount/World.frameRate);
     textSize(15);
     text("Survival Time: "+survivaltime,10,50);
  
     if (ground.x === 0){
       
         ground.x = ground.width/2;
         
     }
  
     if (keyDown("space")&& monkey.y >= 319){
       
         monkey.velocityY = -15;
         playSound("assets/maro-jump-sound-effect_1.mp3", false);
         
     }
     
     monkey.velocityY = monkey.velocityY +0.6;
     
     monkey.collide(ground);
  
     Banana();
     Obstacle();
  
     if(monkey.isTouching(obstacleGroup)){
       
        gameState = END;
        obstacleGroup.destroyEach();
        playSound("assets/category_music/gameover.mp3");
        
     }
     
     if(monkey.isTouching(bananaGroup)){
       
       bananaGroup.destroyEach();
       score = score + 1;
       
     }
  
  }
  
  
  if(gameState === END){
    
     textSize(24);
     textFont(BOLD);
     fill("red");
     text("GAME OVER",130,200);
     monkey.destroy();
     bananaGroup.destroyEach();
     obstacleGroup.destroyEach();
     ground.destroy();
    
  }
  
  drawSprites();
  
  textSize(15);
  text("Score:" + score, 300, 50);
  
}



function Banana(){
  
  if(World.frameCount % 80 === 0){
    
     var banana = createSprite(400,randomNumber(160,240),20,20);
     banana.setAnimation("Banana");
     banana.velocityX = -4;
     banana.scale =0.05;
     banana.lifetime = 110;
     monkey.depth = banana.depth;
     monkey.depth = banana.depth + 1;
     bananaGroup.add(banana);
  }
  
}

function Obstacle(){
  
  if (World.frameCount%300===0){
    
      var obstacle = createSprite(400,340,20,20);
      obstacle.setAnimation("Stone");
      obstacle.velocityX = -4;
      obstacle.scale = 0.15;
      obstacle.lifetime = 110;
      obstacleGroup.add(obstacle);
    
  }
  
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
