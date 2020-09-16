import fetch from 'node-fetch'
import configs from '../../configs'
import logger from 'utils/logger'
import versions from 'versions'

const checkError = (response, reject) => {
  if ([200].indexOf(response.status) < 0) {
    reject(`Error on request: Status ${response.status}`)
  }
}

const request = (host, options) => {
  logger.debug(`Resquesting at "${options.method}" : "${host}" ...`, { scope: 'HTTP' })
  return new Promise((resolve, reject) => {
    fetch(host, options)
    .then(res => {
      checkError(res, reject)
      logger.debug(`Request at "${options.method}" : "${host}. Status: ${res.status}"`, { scope: 'HTTP' })
      resolve(res.json())
    })
  })
}

const createRequestPromise = (config) => {
  logger.debug(`Requesting Health ${config.info.version}`, { scope: 'HealthCheck' })

  return request(`http://localhost:${configs.api.port}/${config.info.version}/health`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const getStatus = (element) => {
  var status = true
  if (typeof element === 'boolean' && !element) {
    return false
  }
  if (element != null && typeof (element) === 'object') {
    Object.keys(element).forEach(key => {
      if (status) {
        status = getStatus(element[key])
      }
    })
  }
  return status
}

const execute = async (ctx) => {
  const promises = versions.map((config) => createRequestPromise(config.swaggerConfig))
  const results = await Promise.all(promises)

  ctx.body = getStatus(results)
}

export const config = (router) => {
  router.get(`/health`, execute)
}
