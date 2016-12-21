(function(graph) {
  var canvas = document.getElementById("canvas"),
      canvasWidth = canvas.width,
      context = canvas.getContext("2d"),
      blockWidth = 80;

  const WHITE_PIECE = 0,
        BLACK_PIECE = 1,
        FILL_WHITE_1 = "#efefe6",
        FILL_WHITE_2 = "#d6d6c6",
        FILL_BLACK_1 = "#777777",
        FILL_BLACK_2 = "#555555";

  function xOfBlock(num) {
    var mod4 = num % 4;
    var mod8 = num % 8;
    var lvl = Math.floor(mod8 / 4);
    return blockWidth/2 + mod4 * (2 * blockWidth) + lvl * blockWidth;
  }

  function yOfBlock(num) {
    return canvasWidth - blockWidth * (Math.floor(num / 4) + 0.5);
  }

  var renderer = (function() {
    return {
      drawPiece: function(x, y, col) {
        context.beginPath();
        context.fillStyle = FILL_WHITE_1;
        context.arc(x, y, 32, 0, 2 * Math.PI);
        context.fill();

        context.beginPath();
        context.arc(x, y, 26, 0, 2 * Math.PI);
        context.fillStyle = FILL_WHITE_2;
        context.fill();
      },
      drawPieceInGrid: function(x, y, col) {
        var delta = canvasWidth/8,
            locX = delta * (x + 0.5),
            locY = delta * (y + 0.5);

        // Outer circle
        context.beginPath();
        context.arc(locX, locY, delta/2 - 8, 0, 2 * Math.PI);
        if (col === WHITE_PIECE) {
          context.fillStyle = FILL_WHITE_1;
        } else {
          context.fillStyle = FILL_BLACK_1;
        }
        context.fill();

        // Inner circle
        context.beginPath();
        context.arc(locX, locY, 26, 0, 2 * Math.PI);
        if (col === WHITE_PIECE) {
          context.fillStyle = FILL_WHITE_2;
        } else {
          context.fillStyle = FILL_BLACK_2;
        }
        context.fill();
      },

      drawPieceInBlock: function(block, col) {
        var locX = xOfBlock(block),
            locY = yOfBlock(block);

        // Outer circle
        context.beginPath();
        context.arc(locX, locY, 32, 0, 2 * Math.PI);
        if (col === WHITE_PIECE) {
          context.fillStyle = FILL_WHITE_1;
        } else {
          context.fillStyle = FILL_BLACK_1;
        }
        context.fill();

        // Inner circle
        context.beginPath();
        context.arc(locX, locY, 26, 0, 2 * Math.PI);
        if (col === WHITE_PIECE) {
          context.fillStyle = FILL_WHITE_2;
        } else {
          context.fillStyle = FILL_BLACK_2;
        }
        context.fill();
      }
    };
  }());

  for (var i = 0; i < 12; i++) {
    renderer.drawPieceInBlock(i, WHITE_PIECE);
  }
  renderer.drawPieceInBlock(31, BLACK_PIECE)
}(boardGraph));

// var lastStamp;
//
// function update(timestamp) {
//   var delta;
//
//   delta = timestamp - lastStamp;
//   lastStamp = timestamp;
//
//   context.clearRect(0, 0, 640, 640);
//   drawPiece(40,40, "white");
//   // context.fillRect(Math.random()*640, Math.random()*640, 50, 50);
//
//   window.requestAnimationFrame(update);
// }
//
// function drawPiece(x, y, col) {
//   context.beginPath();
//   context.arc(x, y, 32, 0, 2 * Math.PI);
//   context.fillStyle = "#efefe6";
//   context.fill();
//
//   context.beginPath();
//   context.arc(x, y, 26, 0, 2 * Math.PI);
//   context.fillStyle = "#e0e0d6";
//   context.fill();
// }
//
// lastStamp = Date.now();
// window.requestAnimationFrame(update);
