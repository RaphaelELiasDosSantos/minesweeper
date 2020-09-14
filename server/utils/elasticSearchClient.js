import elasticsearch from 'elasticsearch'
import configs from '../../configs'
import logger from 'utils/logger'
// import httpAwsEs from 'http-aws-es'

let client = null

const init = () => {
  function log () {
    this.error = () => {}
    this.warning = () => {}
    this.info = () => {}
    this.debug = () => {}
    this.trace = (method, requestUrl) => {
      logger.debug(`request at "${requestUrl.path}"`, { scope: 'ElasticSearch' })
    }
  }

  logger.debug(`init client "${configs.elastic.host}"`, { scope: 'ElasticSearch' })

  /*
    client = new elasticsearch.Client({
        host: env.get('ELASTIC_SEARCH_SERVER'),
        connectionClass: useAws === 'true' ? httpAwsEs : env.get('ELASTIC_SEARCH_CUSTOM_CLUSTER_PROTOCOL'),
        amazonES: {
        region: env.get('ELASTIC_SEARCH_AWS_REGION'),
        accessKey: env.get('ELASTIC_SEARCH_ACCESS'),
        secretKey: env.get('ELASTIC_SEARCH_SECRET')
        },
        log: log
    })
  */
  client = new elasticsearch.Client({
    host: configs.elastic.host + ':' + configs.elastic.port,
    log: log
  })
  logger.debug(`Finish init client "${configs.elastic.host + ':' + configs.elastic.port}"`, { scope: 'ElasticSearch' })
}
const getOneSearch = async (idClient, month, year) => {
  const response = await initAll().search({
    index: 'client-' + year + '.' + month,
    type: 'doc',
    body: {
      query: {
        bool: {
          filter: {
            bool: {
              should: [
                {
                  term: {
                    'ID_CLIENT': idClient
                  }
                },
                {
                  term: {
                    'ID_CLIENT': idClient
                  }
                }
              ]
            }
          }
        }
      }
    }
  })
  return response
}
const initAll = () => {
  if (!client) {
    init()
  }
  return client
}
module.exports = {
  getOneSearch
}
