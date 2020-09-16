import {
  Game
} from '../../../../server/models'
import moment from 'moment'
import { placeMinesOnBoard, markNewPosition, generateNewViewBoard } from '../utils/mines'
const create = async (userId, data) => {
  let newGame = new Game()
  const real_board = placeMinesOnBoard(data.rows, data.cols, data.number_mines)
  const view_board = generateNewViewBoard(data.rows, data.cols)
  newGame.cols = data.cols
  newGame.rows = data.rows
  newGame.userId = userId
  newGame.number_mines = data.number_mines
  newGame.init_time = moment()
  newGame.real_board = real_board
  newGame.view_board = view_board
  newGame.status = 'playing'
  const gameGenerated = await newGame.save()
  return {'response': true, 'id': gameGenerated._id, 'view_board': view_board}
}
const list = async (userId) => {
  const games = await Game.find({ userId }).select({'_id': 1, 'view_board': 1, 'userId': 1, 'rows': 1, 'cols': 1, 'number_mines': 1})
  return {'response': true, 'games': games}
}
const destroy = async (userId, gameId) => {
  const game = await Game.findOne({ _id: gameId, userId })
  if (!game) {
    return {'response': false, 'message': 'Not Found'}
  }
  await Game.remove({ _id: gameId })
  return {'response': true}
}
const mark = async (userId, gameId, data) => {
  const game = await Game.findOne({ _id: gameId, userId })
  if (!game) {
    return {'response': false, 'message': 'Not found'}
  } else if (game.status !== 'playing') {
    return {'response': false, 'message': 'Game has ended'}
  }
  let view_board = JSON.parse(JSON.stringify(game.view_board))
  let real_board = game.real_board
  let rows = game.rows
  let cols = game.cols
  let { row, col, type } = data
  let status = markNewPosition(view_board, real_board, rows, cols, row, col, type)
  game.view_board = view_board
  if (status !== 'continue') {
    game.status = status
    game.end_time = moment()
  }
  await game.save()
  return {'response': true, 'view_board': view_board, 'status': game.status}
}
module.exports = {
  create,
  list,
  destroy,
  mark
}
