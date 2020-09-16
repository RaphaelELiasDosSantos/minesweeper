import game from '../lib/game'

const create = async(ctx) => {
  if (!ctx.request.body.rows) {
    ctx.status = 400
    ctx.body = {'response': false, 'message': 'rows is missing on body'}
    return
  } else if (!ctx.request.body.cols) {
    ctx.status = 400
    ctx.body = {'response': false, 'message': 'cols is missing on body'}
    return
  } else if (!ctx.request.body.number_mines) {
    ctx.status = 400
    ctx.body = {'response': false, 'message': 'number_mines is missing on body'}
    return
  }
  const response = await game.create(ctx.request.header.jwt_id, ctx.request.body)
  if (!response.response) {
    ctx.status = 400
  }
  ctx.body = response
}
const list = async(ctx) => {
  const response = await game.list(ctx.request.header.jwt_id)
  if (!response.response) {
    ctx.status = 400
  }
  ctx.body = response
}
const destroy = async (ctx) => {
  const response = await game.destroy(ctx.request.header.jwt_id, ctx.params.id)
  if (!response.response) {
    ctx.status = 400
  }
  ctx.body = response
}
const mark = async (ctx) => {
  if (!ctx.request.body.row && ctx.request.body.row !== 0) {
    ctx.status = 400
    ctx.body = {'response': false, 'message': 'row is missing on body'}
    return
  } else if (!ctx.request.body.col && ctx.request.body.col !== 0) {
    ctx.status = 400
    ctx.body = {'response': false, 'message': 'col is missing on body'}
    return
  } else if (!ctx.request.body.type) {
    ctx.status = 400
    ctx.body = {'response': false, 'message': 'type is missing on body, the options are: R -> red flag / F -> Flag / O -> uncoverer the space'}
    return
  }
  const response = await game.mark(ctx.request.header.jwt_id, ctx.params.id, ctx.request.body)
  if (!response.response) {
    ctx.status = 400
  }
  ctx.body = response
}
module.exports = {
  create,
  list,
  destroy,
  mark
}
