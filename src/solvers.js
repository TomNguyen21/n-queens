/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// do we need to make an matrix class?

window.findNRooksSolution = function(n) {
  // will contain our new Board instances that contain a solution that has no conflics
  // helper functions hasAnyRookConflicts, and Toogle
  var solution = new Board({'n': n}); //fixme
  // create rook counter
  var rooks = 0;
  var rowIndex = 0;
  // iterate throught the board
  for (var i = 0; i < n; i++) {
    // check to see if there is any conflicts at given array indexes
    if (!solution.hasRowConflictAt(rowIndex) && !solution.hasColConflictAt(i)) {
      //toggle the piece and add rook counter?
      console.log(i,"poop")
      solution.togglePiece(rowIndex, i);
      rowIndex++;
    }
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
