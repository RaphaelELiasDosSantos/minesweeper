import logger from 'utils/logger'

 /**
 * @version v.3.0
 * @module services/health
 * @method [services/health] get
 * @description Builds response payload with flags indicating the health of the microservice
 * @param  {KoaContext} ctx
 */
export const get = async (ctx) => {
  logger.debug('Getting server health information!')

  ctx.body = { '/health': true }
}
