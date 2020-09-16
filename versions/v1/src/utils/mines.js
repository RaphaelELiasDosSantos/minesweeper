const relationalIndicesMap = [
  {row: -1, col: -1},
  {row: -1, col: 0},
  {row: -1, col: 1},
  {row: 0, col: -1},
  {row: 0, col: 1},
  {row: 1, col: -1},
  {row: 1, col: 0},
  {row: 1, col: 1}
]
const redFlag = 'R'
const marker = 'F'
const coveredSpace = 'X'
const uncoveredSpace = 'O'
const bomb = 'B'
const generateEmptyBoard = (rows, cols) => {
  let board = []
  // Create board of zeros
  for (let i = 0; i < rows; i++) {
    board[i] = []
    for (let j = 0; j < cols; j++) {
      board[i][j] = 0
    }
  }
  return board
}
const placeMinesOnBoard = (rows, cols, numberOfMines) => {
  let board = generateEmptyBoard(rows, cols)

  // Generate random mine placement
  for (let i = 0; i < numberOfMines; i++) {
    let row = Math.floor(Math.random() * rows)
    let column = Math.floor(Math.random() * cols)
    // If no mine at indices, place mine
    if (board[row][column] === 0) {
      board[row][column] = bomb
    } else {
      i--
    }
  }
  // Generate proximity numbers
  determineMineProximityNumbers(rows, cols, board)
  return board
}
const isInBounds = (rows, cols, row, col) => {
  let rowInBounds = row >= 0 && row < rows ? true : false
  let colInBounds = col >= 0 && col < cols ? true : false
  return rowInBounds && colInBounds
}
const determineMineProximityNumbers = (rows, cols, board) => {

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < cols; column++) {

      // Skip over mines
      if (board[row][column] === bomb) {
        continue
      }

      // Keep track of number of bombs adjacent to current indices
      let numOfBombsInVicinity = 0

      // Iterate over 8 surround squares
      relationalIndicesMap.forEach(relIndex => {
        let rowToCheck = row + relIndex.row
        let colToCheck = column + relIndex.col
        if (!isInBounds(rows, cols, rowToCheck, colToCheck)) return
        if (board[rowToCheck][colToCheck] === bomb) {
          numOfBombsInVicinity++
        }
      })

      // Label square with result
      board[row][column] = numOfBombsInVicinity
    }
  }
}
const generateNewViewBoard = (rows, cols) => {
  let viewBoard = []
  for (let i = 0; i < rows; i++) {
    viewBoard[i] = []
    for (let j = 0; j < cols; j++) {
      viewBoard[i][j] = coveredSpace
    }
  }
  return viewBoard
}
const markNewPosition = (view_board, real_board, rows, cols, row, col, type) => {
  if (view_board[row][col] === coveredSpace && type === marker) {
    // question mark
    view_board[row][col] = marker
    return 'continue'
  } else if (view_board[row][col] === coveredSpace && type === redFlag) {
    // red flag
    view_board[row][col] = redFlag
    return 'continue'
  } else if ((view_board[row][col] === marker && type === marker) || (view_board[row][col] === redFlag && type === redFlag)) {
    // If marked, unmark it
    view_board[row][col] = coveredSpace
    return 'continue'
  } else if (type === uncoveredSpace && [redFlag, marker, coveredSpace].includes(view_board[row][col])) {
    // it will uncover the space
    if (real_board[row][col] === bomb) {
      view_board[row][col] = real_board[row][col]
      return 'lose'
    } else if (real_board[row][col] !== 0) {
      // If space is anything but a zero, uncover it
      view_board[row][col] = real_board[row][col]
      if (checkForWinGame(view_board, real_board)) return 'win'
      return 'continue'
    } else if (real_board[row][col] === 0) {
      // If space is zero, uncover adjacent spaces as well
      uncoverAdjacentSpaces(view_board, real_board, rows, cols, row, col)
      if (checkForWinGame(view_board, real_board)) return 'win'
      return 'continue'
    }
  }
}
const uncoverAdjacentSpaces = (view_board, real_board, rows, cols, row, col) => {
  // Space is a zero (not adjacent to any bombs)
  // Uncover, increase count
  view_board[row][col] = 0
  /*
  Check Adjacent Squares.  Uncover all non-bombs, and recurse on zeros
  */
  relationalIndicesMap.forEach(relIndex => {
    let rowToCheck = row + relIndex.row
    let colToCheck = col + relIndex.col
    if (!isInBounds(rows, cols, rowToCheck, colToCheck)) return
    if (view_board[rowToCheck][colToCheck] !== coveredSpace) return
    if (real_board[rowToCheck][colToCheck] === bomb) return
    if (real_board[rowToCheck][colToCheck] > 0) {
      view_board[rowToCheck][colToCheck] = real_board[rowToCheck][colToCheck]
    } else { // Space equals zero, so recurse
      uncoverAdjacentSpaces(view_board, real_board, rows, cols, rowToCheck, colToCheck)
    }
  })
}
const checkForWinGame = (view_board, real_board) => {
  for (let i = 0; i < view_board.length; i++) {
    for (let j = 0; j < view_board[i].length; j++) {
      if ([redFlag, coveredSpace, marker].includes(view_board[i][j]) && real_board[i][j] !== bomb) {
        return false
      }
    }
  }
  return true
}
module.exports = {
  placeMinesOnBoard,
  generateNewViewBoard,
  markNewPosition
}
