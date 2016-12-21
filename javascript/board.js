var BoardGraph = (function() {
  var upTiles,
      downTiles,
      size;

  function Node() {
    var bag = [];

    this.addAdj = function(nodeNum) {
      bag.push(nodeNum);
    };

    this.adj = function() {
      return bag;
    };

    this.countAdj = function() {
      return bag.length;
    };

    this.string = function() {
      return bag.toString();
    }
  }

  function isBounded(index) {
    if (index >= 0 && index < size) {
      return true;
    }
    return false;
  }

  // initialise the graph
  (function () {
    size = 32;
    upTiles = [];
    downTiles = [];
    var i, j, cur;

    /* Create all the Nodes */
    for (i = 0; i < size; i++) {
      upTiles[i] = new Node();
      downTiles[i] = new Node();
    }

    /* Link all the UP and DOWN nodes */
    for (i = 0; i < 28; i++) {
      upTiles[i].addAdj(i + 4);
      downTiles[31 - i].addAdj(31 - i - 4);
    }

    /* all the LEFT links */
    cur = 1;
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 3; j++) {
        upTiles[cur + j].addAdj(cur + j + 3);
        downTiles[31 - cur - j].addAdj(31 - 3 - cur - j);
      }
      cur += 8;
    }

    /* all the RIGHT links */
    cur = 4;
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        upTiles[cur + j].addAdj(cur + j + 5);
        downTiles[31 - cur - j].addAdj(31 - 5 - cur - j);
      }
      cur += 8;
    }
  }());

  return {
    printUpTiles: function() {
      var strBoard = "";
      for (var i = size - 1; i >= 0; i--) {
        strBoard += i + ": " + upTiles[i].string() + "\n";
      }
      console.log(strBoard);
    },

    printDownTiles: function() {
      var strBoard = "";
      for (var i = size - 1; i >= 0; i--) {
        strBoard += i + ": " + downTiles[i].string() + "\n";
      }
      console.log(strBoard);
    },

    upperIndices: function(index) {
      if (isBounded(index)) {
        return upTiles[index].adj();
      }
    },

    lowerIndices: function(index) {
      if (isBounded(index)) {
        return downTiles[index].adj();
      }
    }
  };
}());

var BoardThing = (function() {
  const WHITE_MAN = 0,
        BLACK_MAN = 1,
        WHITE_KING = 2,
        BLACK_KING = 3,

        TL = 0, // DIRECTION TOP LEFT
        TR = 1, // DIRECTION TOP RIGHT
        BL = 2, // DIRECTION BOTTOM LEFT
        BR = 3; // DIRECTION BOTTOM RIGHT

  /**
  * A private object representing all the pieces and their locations on
  * the board.
  * 'copy' is an optional array to copy. If null, a new board state
  * is created with a starting checkers board configuration.
  */
  function BoardState(copy) {
    var pieces = [];

    // If an array is passed in, copy it
    if (copy) {
      var len = pieces.length;
      while (len--) {
        pieces[len] = copy[len];
      }
    } else { // Else, make a starting board
      for (var i = 0; i < 12; i++) {
        pieces[i] = WHITE_MAN;
        pieces[31 - i] = BLACK_MAN;
      }
    }

    /**
    * Causes the current board to copy itself, perform the given move
    * on the copy and then return the copy.
    */
    this.makeMove = function(move) {
      var clone = new BoardState(pieces),
          src = move.getSrcBlock(),
          dir = move.getDirection(),
          p = pieces[src];

      // TODO: Perform the move
      
      // if (isMan(p)) {
      //   if (isWhite) {
      //     var upper = BoardGraph.upperIndices();
      //     for (index in upper) {
      //       // Check for empty spaces and black pieces
      //     }
      //   } else {
      //     var lower = BoardGraph.lowerIndices();
      //   }
      // } else {
      //   // It is a King, so all indices are needed
      //   var upper = BoardGraph.upperIndices();
      //   var lower = BoardGraph.lowerIndices();
      // }
      return clone;
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

  var state = new BoardState();
  var newBoard = state.makeMove(new Move(8, TL));

}());



// (function() {
//   boardGraph.createBoard();
//   boardGraph.printUpTiles();
//   boardGraph.printDownTiles();
// }());
