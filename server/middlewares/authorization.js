import jwt from '../../server/utils/create-jwt'
import config from '../../configs'
export default async function (ctx, next) {
  const isPathValid = new RegExp(`/health|register|login`).test(ctx.request.path)

  // ctx.request.header['authorization'] = await createBearerToken(ctx)
  console.log(isPathValid)
  if (!isPathValid) {
    await isAuthorizationValid(ctx)
  }

  await next()
}

async function isAuthorizationValid (ctx) {
  const authorization = ctx.request.header['authorization']

  /* IMPLEMENTE SEU BYPASS AQUI */
  if (ctx.request.header['x-origin'] === 'bypass') {
    ctx.request.header['authorization'] = await createBearerToken(ctx)
    return
  }

  if (authorization === undefined || !authorization.startsWith('Bearer')) {
    throw new Error('ERROR:1')
  }
}

async function createBearerToken (ctx) {
  const jwtToken = await jwt.sign({
    email: 'raphamah@hotmail.com',
    _id: '5d0fde8fefe9520518802e12'
  }, config.jwt.secret, true)

  return jwtToken
}

