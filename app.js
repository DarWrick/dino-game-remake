const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
context.globalCompositeOperation = 'destination-over';

// dino

const dinoImg = new Image();
dinoImg.src = "images/dino/dino(1).png";
setInterval(() => {
  dinoImg.src = "images/dino/dino(1).png";
}, 100)
setInterval(() => {
  dinoImg.src = "images/dino/dino(2).png";
}, 200)


let dino = {
  x: 30,
  y: 165,
  w: 50,
  h: 55,
}

// cactuses

const cactus1Img = new Image();
cactus1Img.src = "images/cactus/cactus1.png"

let cactus1 = {
  x: getRandomInt(600,700),
  y: 167,
  w: 30,
  h: 55,
}

const cactus2Img = new Image();
cactus2Img.src = "images/cactus/cactus2.png";

let cactus2 = {
  x: getRandomInt(900,1100),
  y: 167,
  w: 50,
  h: 55,
}

let cactusSpeed = 4;

// cloudes Img
const clouds = new Image();
clouds.src = "images/clouds/clouds1.png"

// get Random Numbers
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function game() {
  update();
  render();
  requestAnimationFrame(game);
}
requestAnimationFrame(game);

// move Cactuses

function movecactuses(){
  cactus1.x -= cactusSpeed;
  cactus2.x -= cactusSpeed;

  if(cactus1.x <= -20) {
    cactus1.x= getRandomInt(600, 1000);
  }else if(cactus2.x <= -20){
    cactus2.x = getRandomInt(600, 1400);
  }
  checkCactusDistance ();
}

function checkCactusDistance() {
  if(cactus2.x - cactus1.x <= 200 && cactus2.x > cactus1.x ) {
    cactus2.x +=200;
  }else if(cactus1.x - cactus2.x <= 200 && cactus1.x > cactus2.x ) {
    cactus1.x == 200;
  }
}
// dino move

let isJumping = false;

document.addEventListener("keydown", (e) => {
  if(e.keyCode === 32 && dino.y === 165) {
    isJumping = true;
  }
})

function dinoJump() {
  if(isJumping == true) {
    dino.y -= 13;

    setTimeout(() => {
      isJumping = false;
    }, 200)
  }

  if(dino.y != 165){
    dinoImg.src = "Images/dino/dino(3).png";
  }
}

function dinoMove() {
  dino.y += 4;
  if(dino.y >= 165) dino.y = 165;

  dinoJump();
}

function gameOver() {
  if (cactus1.x <= dino.x + dino.w -25
    && cactus1.y <= dino.y + dino.h -25) {
      location.reload();
    }
}

function update() {
  movecactuses();
  dinoJump();
  dinoMove();
  gameOver();
  checkScore();
}

//  Rclouds Update
let cloudsArr = [];

let timer = 0;
function renderCLouds() {
  timer ++;
  if(timer % 150 === 0) {
    cloudsArr.push({
      x:600,
      y:getRandomInt(0,50),
      w:getRandomInt(40,50),
      h:getRandomInt(20,30),
    })
  }

  for(let i in cloudsArr) {
    context.drawImage(clouds, cloudsArr[i].x, cloudsArr[i].y, cloudsArr[i].w, cloudsArr[i].h);
  }

  cloudsMove();
  deleteClouds();
}

function cloudsMove() {
  for(let i in cloudsArr) {
    cloudsArr[i].x --;
  }
}

function deleteClouds() {
  for(let i in cloudsArr){
    if(cloudsArr[i].x <= -50){
      cloudsArr.splice(i,1);
    }
  }
}

// score Update
let score = 0;
let scoreSpeed = 0;


setInterval(() => {
  score++;
}, 200);

setInterval(() => {
  scorespeed++;
}, 200)

function checkScore() {
  if(scoreSpeed >= 100) {
    cactusSpeed++;
    scoreSpeed = 0;
  }
}

// Render All

function rendercactuses() {
  context.drawImage(cactus1Img, cactus1.x, cactus1.y, cactus1.w, cactus1.h);
  context.drawImage(cactus2Img, cactus2.x, cactus2.y, cactus2.w, cactus2.h);
}

function renderDino() {
context.drawImage(dinoImg, dino.x, dino.y, dino.w, dino.h);
}

function renderScore() {
  context.fillText(score, 550, 40);
  context.font = "25px Times New Roman ";
  context.fillstyle = "#656565";
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  renderDino();
  rendercactuses();
  renderCLouds();
  renderScore();
  context.closePath();
}