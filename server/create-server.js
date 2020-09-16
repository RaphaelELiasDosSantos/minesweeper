import { ui, validate } from 'swagger2-koa'
import Koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-body'
import koaConvert from 'koa-convert'
import koaCors from 'koa-cors'
import logger from './utils/logger'
import env from '../configs'
import auth from './middlewares/auth'
import versions from './versions'
import error from './middlewares/error'
import authorization from './middlewares/authorization'
import extractInformation from './middlewares/extractInformation'
import * as health from 'health/health'

import './utils/mongoClient'

export default async function createServer (options = {}) {
  logger.debug('Creating server...', { scope: 'startup' })

  const config = await initWithVersions(options)
  health.config(config.router)

  config.app.use(koaBody({
    multipart: true,
    formLimit: '50mb',
    textLimit: '50mb'
  }))
  config.app.use(config.router.routes())

  logger.debug(`Server created, ready to listen on port ${env.api.port}`, { scope: 'startup' })
  return config.app
}

/* eslint-disable max-statements  */
async function initWithVersions (options) {
  const app = new Koa()
  const router = koaRouter()

  app.use(koaConvert(koaCors()))
  app.use(error)
  app.use(authorization)
  app.use(await auth(options.JWTparams))
  app.use(extractInformation)
  for (let config of versions) {
    // app.use(koaConvert(validate(config.swaggerConfig)))
    app.use(ui(config.swaggerConfig))
    config.routes(config.swaggerConfig, router)
  }

  return {
    app: app,
    router: router
  }
}
/* eslint-enable */
