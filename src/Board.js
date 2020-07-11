// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //rowIndex represent where the nested collumarray is the nested row array
      // console.log(this.get(rowIndex), "my this log");
      var rowArray = this.get(rowIndex);
      // need to get the current row array.
      // counter to track how many placemarkers
      // one placemaker = 1
      var conflictTotal = 0;
      for (var i = 0; i < rowArray.length; i++) {
        conflictTotal += rowArray[i];
      }
      // needs to check if the row has a current marker in it.
      if (conflictTotal > 1) {
        return true;
      }
      // How are markers represented?
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var boardSize = this.get('n');
      // iterate through board size
      // this refrences the object that hasRowConflictAt is a property of
      for (var i = 0; i < boardSize; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // create variable to get boardsize
      var boardSize = this.get('n');
      //create counter to keep track of pieces in column
      var conflictTotal = 0;
      // create colIndexArray
      var matrix = this.attributes;
      // console.log(this.get(colIndex))
      // iterate through all the arrays
      for ( var k = 0; k < boardSize; k++) {
        conflictTotal += matrix[k][colIndex];
        // add to counter every element in the column
        if ( conflictTotal > 1) {
          return true;
        }
      // check to see if counter is more than 1
      }
      return false; // fixme

    },

    // test if any columns on this board contain conflicts

    hasAnyColConflicts: function() {
      // make boardsize variable
      var boardSize = this.get('n');
      //iterate through board size
      //add row counter

      for (var i = 0; i < boardSize; i++) {

        if (this.hasColConflictAt(i)) {
          return true;
        }
        //add to row counter ++

      }
      // if conflict at current spot return true
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // console.log(majorDiagonalColumnIndexAtFirstRow, 'major number')
      let diagonalStarter = majorDiagonalColumnIndexAtFirstRow;

      let matrix = this.attributes;
      let conflictsTotal = 0;
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
         diagonalStarter = majorDiagonalColumnIndexAtFirstRow;
        diagonalStarter *= -1;
        for (var i = 0; i < matrix.n; i++) {
          if (this._isInBounds(diagonalStarter, i)) {
            conflictsTotal += matrix[diagonalStarter][i];
            diagonalStarter++;
          }
        }
        if (conflictsTotal > 1) {
          return true;
        }
      } else {
        let diagonalStarter = majorDiagonalColumnIndexAtFirstRow;
        for (var i = 0; i < matrix.n; i++) {
          if (this._isInBounds(i, diagonalStarter)) {
            conflictsTotal += matrix[i][diagonalStarter];
            diagonalStarter++;
          }
          if (conflictsTotal > 1) {
            return true;
          }
        }
      }
        return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardSize = this.get('n');
      var temp = boardSize * -1;
      for (var i = temp; i < boardSize; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // console.log(minorDiagonalColumnIndexAtFirstRow,"minor")
      let matrix = this.attributes;
      let conflictsTotal = 0;
      let diagonalStarter = minorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i < matrix.n; i++) {
        // console.log(matrix[i], 'row ')
        // console.log(diagonalStarter, 'starter')
        if (this._isInBounds(i, diagonalStarter)) {
          conflictsTotal += matrix[i][diagonalStarter];
        }
        diagonalStarter--;
        if (conflictsTotal > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let boardSize = this.get('n');
      let diagonalIndex = boardSize * 2;
      for ( var i = diagonalIndex; i > 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
}());
