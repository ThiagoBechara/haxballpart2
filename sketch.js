const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var bg_img;
var ballImg;
var player1;

var backgSound;

var angleReto = 90;

var player1, player2, ImgP1, ImgP2;
let redGoal, blueGoal;
var placarB = 0;
var placarR = 0;

function preload() {
  bg_img = loadImage("./assets/campo-bg.png");
  ballImg = loadImage("./assets/Soccer_ball.png");
  ImgP1 = loadImage("./assets/ballRed.png");
  ImgP2 = loadImage("./assets/ballBlue.png");
}

function setup() {
  createCanvas(1100, 700);
  //canvas.style =
  /*"position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid blue";*/

  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //fazer contagem de placar
  
  redGoal = createSprite(68, 350, 5, 100);
  redGoal.shapeColor = rgb(139, 0, 0, 0.5);

  blueGoal = createSprite(1050, 350, 5, 100);
  redGoal.shapeColor = rgb(189, 189, 189, 0.5);

  player1 = createSprite(155, 350, 40, 40);
  player1.addImage("jogador1", ImgP1);
  player1.scale = 0.11;
  player2 = createSprite(950, 350, 40, 40);
  player2.addImage("jogador2", ImgP2);
  player2.scale = 0.11;

  ball = createSprite(550, 355);
  ball.addImage("ball", ballImg);
  ball.scale = 0.015;
  ball.setCollider("circle", 0, 0, 25);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
}

function draw() {
  background(0);
  image(bg_img, 550, 350, width, height);

  Engine.update(engine);


  player1.bounce(ball);
  controls();
  limites();

  player2.bounce(ball);

  if (ball.velocityX > 0) {
    ball.velocityX -= 0.5;
  } else if (ball.velocityX < 0) {
    ball.velocityX += 0.5;
  }

  if (ball.velocityY > 0) {
    ball.velocityY -= 0.5;
  } else if (ball.velocityY < 0) {
    ball.velocityY += 0.5;
  }


  drawSprites();

  fill("white");
  text("PlacarRed: " + placarR, 400, 50);
  text("PlacarBlue: " + placarB, 600, 50);

}

function controls() {
  //controles player1
  if (keyDown("UP")) {
    // player1.y=player1.y-4;
    player1.velocityY = -4;
  }
  else if (keyDown("DOWN")) {
    // player1.y=player1.y+4;
    player1.velocityY = 4;
  }
  else if (keyDown("RIGHT")) {
    //player1.x=player1.x+4;
    player1.velocityX = 4;
  }
  else if (keyDown("LEFT")) {
    player1.velocityX = -4;
    // player1.x=player1.x-4;
  }
  else {
    player1.velocityX = 0;
    player1.velocityY = 0;
  }

  //condição para chute player1
  if (keyCode == 88) {
    if (ball.x < player1.x) {
      ball.velocityX -= (1 * frameRate()) / 80;
    }
    if (ball.x > player1.x) {
      ball.velocityX -= (1 * frameRate()) / 80;
    }
  }
  if (keyCode == 88) {
    if (ball.y< player1.y) {
      ball.velocityY-= (1 * frameRate()) / 80;
    }
    if (ball.y> player1.y) {
      ball.velocityY-= (1 * frameRate()) / 80;
    }
  }
  //condição para alerta de gol
  if (ball.isTouching(redGoal)) {
    goal();
    //fazer contagem de gols
  }

  //criar controles player2 

  if (keyDown("W")) {
    player2.velocityY = -4;
  }
  else if (keyDown("S")) {
    player2.velocityY = 4;
  }
  else if (keyDown("D")) {
    player2.velocityX = 4;
  }
  else if (keyDown("A")) {
    player2.velocityX = -4;
  }
  else {
    player2.velocityX = 0;
    player2.velocityY = 0;
  }

  //criar chute do player2
  if (keyCode == 32) {
    if (ball.x < player2.x) {
      ball.velocityX -= (1 * frameRate()) / 80;
    }
    if (ball.x > player2.x) {
      ball.velocityX -= (1 * frameRate()) / 80;
    }
  }
  if (keyCode == 32) {
    if (ball.y< player2.y) {
      ball.velocityY-= (1 * frameRate()) / 80;
    }
    if (ball.y> player2.y) {
      ball.velocityY-= (1 * frameRate()) / 80;
    }
  }
  //marcação de gol
  if (ball.isTouching(blueGoal)) {
    Bluegoal();
    //fazer contagem de gols
  }
}

function limites() {
  //limites player1
  if (player2.x > 1064) {
    player2.x = 1060;
  }
  if (player2.x < 50) {
    player2.x = 55;
  }

  if (player2.y > 650) {
    player2.y = 600;
  }
  if (player2.y < 50) {
    player2.y = 55;
  }

  //limites bola
  if (ball.x > 1064) {
    ball.x = 1060;
  }
  if (ball.x < 50) {
    ball.x = 55;
  }

  if (ball.y > 650) {
    ball.y = 600;
  }
  if (ball.y < 50) {
    ball.y = 55;
  }

  //criar limites player2
  
}

//alert gol
function goal() {
  swal(
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg/280px-Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
      imageSize: "200x150",
      title: `Goooool!!!`,
      text: "Do time Azul!!",
      confirmButtonText: "JOGAR",
      confirmButtonColor: "darkgreen", //Cor do botão
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function Bluegoal() {
  swal(
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg/280px-Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
      imageSize: "200x150",
      title: `Goooool!!!`,
      text: "Do time Vermelho!!",
      confirmButtonText: "JOGAR",
      confirmButtonColor: "darkgreen", //Cor do botão
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
