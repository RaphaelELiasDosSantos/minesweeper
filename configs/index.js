import dotenv from 'dotenv'
import logger from '../server/utils/logger'

if (!process.env.NODE_ENV) {
  dotenv.config({ silent: true })
}
let configVars = process.env
const requiredVars = [
  'NODE_ENV',
  'API_PORT',
  'AUTH_JWT_SECRET'
]

const missingVars = requiredVars.filter(required => !configVars.hasOwnProperty(required) || configVars[required] === undefined || configVars[required === null])
if (missingVars.length > 0) {
  const missingVarsText = missingVars.reduce((acc, curr) => `'${acc}, ${curr}'`, '')
  logger.error(`${missingVarsText} not found in 'config-vars.json' file.`, { scope: 'startup' })
  process.exit(1)
}

const config = {
  node_env: configVars.NODE_ENV,
  api: {
    host: configVars.HOST,
    env: configVars.NODE_ENV,
    port: configVars.API_PORT
  },
  mongo: {
    url: configVars.MONGO_URL,
    db: configVars.MONGO_DB
  },
  jwt: {
    secret: configVars.AUTH_JWT_SECRET,
    expiration: '720h',
    expireCustomer: 30,
    expireCustomerPeriod: 'days'
  },
  accessCode: {
    length: 6,
    retryPeriod: 172800,
    expiration: 300
  },
  general: {
    useInMemory: false
  }
}

module.exports = config
