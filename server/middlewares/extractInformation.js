import jwt from '../../server/utils/create-jwt'
import config from '../../configs'

export default async function (ctx, next) {
  const isPathValid = new RegExp(`/health|register|login`).test(ctx.request.path)
  const key = config.jwt.secret
  // ctx.request.header['authorization'] = await createBearerToken(ctx)

  if (!isPathValid) {
    const response = await jwt.getInfosInToken(ctx.request.header['authorization'], key)
    ctx.request.header['jwt_id'] = response._id
    ctx.request.header['jwt_email'] = response.email
  }

  await next()
}
