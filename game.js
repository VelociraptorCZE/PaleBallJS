var c = document.getElementById("gameCanvas");
var cn = c.getContext("2d");
window.addEventListener("keydown", playerMovement);
window.addEventListener("mousedown", reset);
window.addEventListener("mousemove", playerMovementMouse);
var lives = 3;
var score = 0;

function playerMovement(){
  if (window.event.keyCode == 65 && player.x > 0){
      player.x -= 20;
  }
  if (window.event.keyCode == 68 && player.x + player.size < c.width){
      player.x += 20;
  }
}

function playerMovementMouse(e){
  if (e.clientX > 0 && e.clientX < c.width - player.size/1.1){
      player.x = e.clientX;
  }
}

function reset(){
  if (lives == 0) {
    lives = 3;
    score = 0;
  }
}

var ball = {
  x: 640,
  y: 370,
  xdir: 3.5,
  ydir: -9,
};

ball.draw = () => {
  if (ball.y < 0) {
    ball.ydir = -ball.ydir;
  }
  if (ball.y > c.height && (ball.x > (player.x + player.size) || ball.x < player.x)){
    player.size = 250;
    lives--;
    ball.xdir = 2.5;
    ball.ydir = 7;
    if (Math.ceil(Math.random() * 5) != 2){
      ball.ydir = -ball.ydir;
    }
    ball.x = 640;
    ball.y = 370;
  }
  else if (ball.y > c.height - 10 && (ball.x < (player.x + player.size) && ball.x > player.x)){
    score++;
    ball.ydir = -ball.ydir;
  }
  if (ball.x < 0 || ball.x > c.width) {
    ball.xdir = -ball.xdir;
  }
  cn.beginPath();
  cn.arc(ball.x, ball.y, 20, 0, Math.PI * 2, true);
  cn.closePath();
  cn.fillStyle = "#fff";
  cn.fill();
}

var player = {
  x: 640,
  size: 250
};

player.draw = () =>{
  if (player.size > 20){
    player.size -= 0.05;
  }
  cn.fillStyle = "#b1e1ff";
  cn.fillRect(player.x, 580, player.size, 20);
}

function drawScene(){
  if (lives > 0){
    ball.xdir += 0.05;
    ball.ydir += 0.1;
    cn.clearRect(0, 0, c.width, c.height);
    cn.fillText("Score: " + score, 10, 40);
    ball.draw();
    player.draw();
    ball.x += ball.xdir;
    ball.y += ball.ydir;
  }
  else{
    cn.font = "100px Segoe UI";
    cn.fillText("Game over", 380, 280);
    cn.font = "40px Segoe UI";
    cn.fillText("Click anywhere to play again", 380, 350);
  }
  cn.font = "30px Segoe UI";
  cn.fillText("Lives: " + lives, 10, 70);
  window.requestAnimationFrame(drawScene);
};

window.onload = () => {
  window.requestAnimationFrame(drawScene);
}
