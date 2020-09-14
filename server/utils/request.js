import request from 'request'

export default {
  asyncRequest
}

/**
 * @module utils/request
 * @method [utils/request] asyncRequest
 * @version v.2.0
 * @description Promisified request module
 * @param {...any} params used by the request module
 * @returns {Promise<HTTPResponse>} http response
 */
async function asyncRequest (...params) {
  return new Promise((resolve, reject) => {
    request(...params, (error, response) => {
      if (error) {
        return reject(error)
      }
      if (response.statusCode !== 200) {
        return reject(response)
      }
      return resolve(response)
    })
  })
}
