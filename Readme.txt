Please read these instructions first:

1.  download all code and data files.
2.  open program.js and complete parseTree function
3.  run the program to see how you've done
4.  make sure to add all your own test cases as needed.
5.  do not use recursion

The goal:

your robot is harvesting fruits from a tree.  trunk and branches are denoted by 0.  fruits are denoted by value > 0.  You job is to create a robot crawler that will start from the root of the three, climb up every branch, and weigh every fruit. 
your robot cannot jump, fly or drop.  it can only move alongside the tree up and down the branches.
your job is to keep track of how much the fruits weigh.

Steps:
1.  Use the data file to create a tree
2.  Complete parse tree function to determine the total weight.

Input file format: every line represents a single branch

1st position in line: identifier of a current branch, starting from 0 to n

2nd position: pointer to the parent identifier

All following positions are children weights, say x total where 0 represents another branch and numbers > 1 represent the weight of the fruit

Next x line(s) represents all children of a current line.  Once all children are accounted for we go on to next branch.  Example

Input 
0, -1, 0, 2
1, 0, 0, 0
2, 1, 10
3, 1, 11

Output: 4

Explaining input:
0, -1, 0, 2 - id 0, parent id -1 which is undefined, has two children one branch (0) and one fruit with weight of 2

1, 0, 0, 0 - id 1, parent 0, two children branches

2, 1, 10 - id 2, parent 1, has one fruit that weights 10., represents first branch that is attached to branch with id 1

3, 1, 11 - id 3, parent id 1, has one fruit that weighs 11, represents the second branch that is attached to branch with id 1.

output: your output should be a sum of all fruits.
