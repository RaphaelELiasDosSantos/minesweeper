import user from '../lib/user'

const login = async(ctx) => {
  const response = await user.login(ctx.request.body, 'normal')
  if (!response.response) {
    ctx.status = 400
  }
  ctx.body = response
}
const create = async(ctx) => {
  const response = await company.create(ctx.request.body)
  if (!response.response) {
    ctx.status = 400
  }
  ctx.body = response
}
const show = async (ctx) => {
  ctx.body = await user.show(ctx.request.header.jwt_id)
}
module.exports = {
  create,
  login,
  show
}
