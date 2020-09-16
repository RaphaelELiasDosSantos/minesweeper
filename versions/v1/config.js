import swaggerConfig from './swagger/swagger'
import routes from './routes'

swaggerConfig.host = swaggerConfig.host

export default {
  swaggerConfig: swaggerConfig,
  routes: routes
}
