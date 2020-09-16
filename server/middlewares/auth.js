import koaJwt from 'koa-jwt'
import config from '../../configs'

export default async function (options) {
  const key = config.jwt.secret

  // Returns configured Koa JWT authentication middleware
  return koaJwt(options || {
    secret: key
  })
  .unless({ path: [ new RegExp(`/health|register|login`) ] }) // validates only API basePath
}
