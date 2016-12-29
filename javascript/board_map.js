var CheckersModule = (function() {
  const TOP_LEFT = 0, // DIRECTION TOP LEFT
        TOP_RIGHT = 1, // DIRECTION TOP RIGHT
        BOT_LEFT = 2, // DIRECTION BOTTOM LEFT
        BOT_RIGHT = 3; // DIRECTION BOTTOM RIGHT
  const NULL = -1;
  const EMPTY_TILE = 0,
        WHITE_MAN = 1,
        BLACK_MAN = 2,
        WHITE_KING = 3,
        BLACK_KING = 4;

  /**
  * Private module used for indexing board locations.
  */
  var BoardGraph = (function() {
    var tiles;

    function Node() {
      var adj = [NULL, NULL, NULL, NULL];

      this.setAdj = function(dir, nodeNum) {
        adj[dir] = nodeNum;
      };

      this.getAdj = function(dir) {
        return adj[dir];
      }

      this.string = function() {
        return adj.toString();
      }
    }

    function isBounded(index) {
      if (index >= 0 && index < 32) {
        return true;
      }
      return false;
    }

    // initialise the graph
    (function () {
      tiles = [];
      var size = 32,
          i, j, cur;

      /* Create all the Nodes */
      for (i = 0; i < size; i++) {
        tiles[i] = new Node();
      }

      cur = 0;
      for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
          tiles[cur + j].setAdj(TOP_RIGHT, cur + j + 4);
          tiles[cur + j + 4].setAdj(BOT_LEFT, cur + j);
        }

        for (j = 0; j < 3; j++) {
          tiles[cur + j + 1].setAdj(TOP_LEFT, cur + j + 4);
          tiles[cur + j + 4].setAdj(BOT_RIGHT, cur + j + 1);
        }
        cur += 8;
      }

      cur = 4;
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
          tiles[cur + j].setAdj(TOP_LEFT, cur + j + 4);
          tiles[cur + j + 4].setAdj(BOT_RIGHT, cur + j);
        }

        for (j = 0; j < 3; j++) {
          tiles[cur + j].setAdj(TOP_RIGHT, cur + j + 5);
          tiles[cur + j + 5].setAdj(BOT_LEFT, cur + j);
        }
        cur += 8;
      }
    }());

    return {
      adjIndex: function(node, dir) {
        if (isBounded(node)) {
          return tiles[node].getAdj(dir);
        }
      }
    };
  }());

  /**
  * A private object representing all the pieces and their locations on
  * the board.
  */
  function BoardState() {
    var pieces = [];

    // Constructor
    (function () {
      var i;
      for (i = 0; i < 12; i++) {
        pieces[i] = WHITE_MAN;
        pieces[31 - i] = BLACK_MAN;
      }

      for (i = 12; i < 20; i++) {
        pieces[i] = EMPTY_TILE;
      }
    }());

    this.makeMove = function(move) {
      var srcIndex = move.getSrcBlock(),
          direction = move.getDirection(),
          srcPiece = pieces[srcIndex],
          destIndex = BoardGraph.adjIndex(srcIndex, direction),
          adjPiece = pieces[destIndex];

      // TODO: Perform the move
      if (adjPiece === EMPTY_TILE) {
        // its a simple move
        pieces[destIndex] = pieces[srcIndex];
        pieces[srcIndex] = EMPTY_TILE;
      } else {
        // theres another piece, so its a jump
        var jumpIndex = BoardGraph.adjIndex(destIndex, direction);
        pieces[jumpIndex] = pieces[srcIndex]; // jump the piece over
        pieces[srcIndex] = EMPTY_TILE; // set its originating tile empty
        pieces[destIndex] = EMPTY_TILE; // kill the piece that was jumped
      }
    }

    // TODO: implement this
    this.undoMove = function(move) {

    }

    this.pieceAt = function(index) {
      return pieces[index];
    }

    this.size = function() {
      return pieces.length;
    }
  }

  /**
  * A private object representing a move or attack on the board.
  */
  function Move(block, direc) {
    var fromBlock = block;
    var direction = direc;

    this.getSrcBlock = function() {
      return fromBlock;
    }

    this.getDirection = function() {
      return direction;
    }
  }

  function isWhite(piece) {
    if (piece === WHITE_MAN || piece === WHITE_KING) {
      return true;
    }
    return false;
  }

  function isBlack(piece) {
    if (piece === BLACK_MAN || piece === BLACK_KING) {
      return true;
    }
    return false;
  }

  function isMan(piece) {
    if (piece === WHITE_MAN || piece === BLACK_MAN) {
      return true;
    }
    return false;
  }

  function isKing() {
    if (piece === WHITE_KING || piece === BLACK_KING) {
      return true;
    }
    return false;
  }

  return {
    TOP_LEFT: TOP_LEFT,
    TOP_RIGHT: TOP_RIGHT,
    BOT_LEFT: BOT_LEFT,
    BOT_RIGHT: BOT_RIGHT,
    NULL: NULL,
    EMPTY_TILE: EMPTY_TILE,
    WHITE_MAN: WHITE_MAN,
    BLACK_MAN: BLACK_MAN,
    WHITE_KING: WHITE_KING,
    BLACK_KING: BLACK_KING,
    BoardState: BoardState,
    Move: Move
  };
}());
