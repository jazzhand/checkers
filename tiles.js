var Node = function() {
	this.bag = [];
}

Node.prototype.addAdj = function(nodeNum) {
	this.bag.push(nodeNum)
}

Node.prototype.adj = function() {
	return this.bag;
}

Node.prototype.countAdj = function() {
	return this.bag.length;
}

/******
 *
 * Link up the board graph
 *
 *****/
var boardGraph = [];
var i, j;
var cur;

/* Create all the Nodes */
for (i = 0; i < 32; i++) {
	boardGraph[i] = new Node();
}

/* Link all the up nodes */
for (i = 0; i < 28; i++) {
	boardGraph[i].addAdj(i+4);
}

/* all the left links */
cur = 1;
for (i = 0; i < 4; i++) {
	for (j = 0; j < 3; j++) {
		boardGraph[cur + j].addAdj(cur + j + 3);
	}
	cur += 8;
}

/* all the right links */
cur = 4;
for (i = 0; i < 3; i++) {
	for (j = 0; j < 3; j++) {
		boardGraph[cur + j].addAdj(cur + j + 5);
	}
	cur += 8;
}

console.log(boardGraph);
console.log(boardGraph[4].adj());
