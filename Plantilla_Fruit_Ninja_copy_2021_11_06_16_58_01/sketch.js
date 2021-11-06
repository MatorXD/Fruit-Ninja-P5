//Estados del Juego
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

var Sound1,Sound2

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  //carga aquí el sonido
  Sound1=loadSound("gameover.mp3");
  Sound2=loadSound("knifeSwoosh.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //crea la espada/cuchillo
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //establece la colisión para el cuchillo
  knife.setCollider("rectangle",0,0,40,40);

  //Puntuación de Variables y Grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Llama la función de frutas y Monstruo
    fruits();
    Monster();
    
    //Mueve la espada/cuchillo con el ratón
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    //Incrementa la puntuación si el cuchillo toca la fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      Sound2.play();
      score=score+2;
    }
    else
    {
      // Ve al estado del juego: end, si el cuchillo toca al enemigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        //agrega aquí el sonido de fin del juego
        
        if(monsterGroup.isTouching(knife)){
          monsterGroup.destroyEach();
          monsterGroup.setVelocityXEach(0);
          Sound1.play();
        }
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Cambia la animación de la espada a gameover y reinicia su posición
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  
  drawSprites();
  //Muestra la puntuación
  textSize(25);
  text("Puntuación : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //actualiza a continuación la línea de código para incrementar la velocidad de monsterGroup en 10
    monster.velocityX = -8;
    monster.setLifetime=50;
    monster.velocityX=-(8+(score/10));
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //utilizando la variable aleatoria, cambia la posición de la fruta para hacerlo más desafiante
    
    if(position==1)
    {
    fruit.x=600;
    //actualiza a continuación la línea de código para incrementar la velocidad de fruitGroup en 4
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
    fruit.velocityX=-(8+(score/10));
      
     //actualiza a continuación la línea de código para incrementar la velocidad de fruitGroup en 7
      fruit.velocityX= 7;
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}