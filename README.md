# Chuckers

This is a board game if you didn't know.
I'm just trying to make a simple checkers game with
some AI functionality. 

All in the name of fun and skill improvement.

## Design:

The conventional game of checkers is played on an 8x8 checkered board with 12 pieces a side.
This standard configuration is assumed throughout the rest of this document.

### Board Implementation:

The board is represented as an array of length 32, indexed according to the following image. That is, from left to right, bottom to top --- omitting tiles that cannot hold pieces.

![Indexed checkers board](images/board_indices.png)

Each board index contains a Node object that has four fields describing it's neighbouring
indices.

![Node structure](images/node_structure.png)

As an example, consider the board index **2**. It's *top-left* index is **5** and it's 
*top-right* index is **6**. The *bottom-left* and *bottom-right* indices are **-1**.

## Implementation:

This program will be coded in Javascript 
