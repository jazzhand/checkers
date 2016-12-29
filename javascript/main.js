(function(CM) {
  var canvas = document.getElementById("canvas"),
      canvasWidth = canvas.width,
      context = canvas.getContext("2d"),
      blockWidth = 80;

  const FILL_WHITE_1 = "#efefe6",
        FILL_WHITE_2 = "#d6d6c6",
        FILL_WHITE_3 = "#3388cc",
        FILL_BLACK_1 = "#777777",
        FILL_BLACK_2 = "#555555",
        FILL_BLACK_3 = FILL_WHITE_3;

  function xOfBlock(num) {
    var mod4 = num % 4;
    var mod8 = num % 8;
    var lvl = Math.floor(mod8 / 4);
    return blockWidth/2 + mod4 * (2 * blockWidth) + lvl * blockWidth;
  }

  function yOfBlock(num) {
    return canvasWidth - blockWidth * (Math.floor(num / 4) + 0.5);
  }

  function drawCircle(locX, locY, r, col) {
    context.beginPath();
    context.arc(locX, locY, r, 0, 2 * Math.PI);
    context.fillStyle = col;
    context.fill();
  }

  function drawPieceInBlock(block, type) {
    var locX = xOfBlock(block),
        locY = yOfBlock(block);

    switch (type) {
      case CM.WHITE_MAN:
        drawCircle(locX, locY, 32, FILL_WHITE_1);
        drawCircle(locX, locY, 26, FILL_WHITE_2);
        break;
      case CM.BLACK_MAN:
        drawCircle(locX, locY, 32, FILL_BLACK_1);
        drawCircle(locX, locY, 26, FILL_BLACK_2);
        break;
      case CM.WHITE_KING:
        drawCircle(locX, locY, 32, FILL_WHITE_1);
        drawCircle(locX, locY, 26, FILL_WHITE_3);
        break;
      case CM.BLACK_KING:
        drawCircle(locX, locY, 32, FILL_BLACK_1);
        drawCircle(locX, locY, 26, FILL_BLACK_3);
        break;
    }
  }

  var renderer = {
    drawBoardState(boardState) {
      var length = boardState.size(),
          piece;
      while (length--) {
        piece = boardState.pieceAt(length);
        if (piece !== CM.EMPTY_TILE) {
          drawPieceInBlock(length, piece);
        }
      }
    }
  };

  var bs = new CM.BoardState();
  // renderer.drawBoardState(bs);
  bs.makeMove(new CM.Move(8, CM.TOP_RIGHT));
  renderer.drawBoardState(bs);

}(CheckersModule));
