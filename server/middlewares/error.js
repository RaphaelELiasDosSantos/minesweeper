import messages from '../utils/error-messages'
import logger from '../../server/utils/logger'

export default async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    logger.error(err, { scope: 'error' })
    let response = messages[err.message] || messages['DEFAULT']
    response.body.details = err.message + ' - ' + JSON.stringify(err)

    ctx = Object.assign(ctx, response)
  }
}
