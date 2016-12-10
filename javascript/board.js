var boardGraph = (function() {
  // var tiles;
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

  return {
    createBoard: function() {
      size = 32;
      upTiles = [];
      downTiles = [];
      var i, j, cur;

      /* Create all the Nodes */
      for (i = 0; i < 32; i++) {
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
    },

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

(function() {
  boardGraph.createBoard();
  boardGraph.printUpTiles();
  boardGraph.printDownTiles();
}());
