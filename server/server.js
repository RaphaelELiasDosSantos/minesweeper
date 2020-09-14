import createServer from 'create-server'
import config from '../configs'
import logger from 'utils/logger'

const { port: PORT, env: NODE_ENV } = config.api

createServer().then(app => {
  app.listen(PORT, () => {
    logger.debug(`Server listening on ${PORT} in ${NODE_ENV} environment`)
  })
}, err => {
  logger.error('Error while starting up server', err)
  process.exit(1)
})
