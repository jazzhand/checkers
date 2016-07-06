var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var lastStamp;

function update(timestamp) {
  var delta;

  delta = timestamp - lastStamp;
  lastStamp = timestamp;

  context.clearRect(0, 0, 640, 640);
  drawPiece(40,40, "white");
  // context.fillRect(Math.random()*640, Math.random()*640, 50, 50);

  window.requestAnimationFrame(update);
}

function drawPiece(x, y, col) {
  context.beginPath();
  context.arc(x, y, 32, 0, 2 * Math.PI);
  context.fillStyle = "#efefe6";
  context.fill();

  context.beginPath();
  context.arc(x, y, 26, 0, 2 * Math.PI);
  context.fillStyle = "#e0e0d6";
  context.fill();
}

lastStamp = Date.now();
window.requestAnimationFrame(update);
