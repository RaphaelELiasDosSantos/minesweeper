import { Bristol } from 'bristol'
import palin from 'palin'

const logger = new Bristol()

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
  logger.addTarget('console').withFormatter(palin)
} else {
  logger.addTarget('file', {file: 'server.log'})
    .withFormatter('commonInfoModel')
}

export default logger
