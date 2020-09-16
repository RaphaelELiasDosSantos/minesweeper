import mongoose from 'mongoose'
import log from 'utils/logger'
import config from '../../configs'
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(config.mongo.url, {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500 // Reconnect every 500ms
})

mongoose.connection.on('connected', () => {
  log.info(`Mongoose connection open to ${config.mongo.url}`)
})

mongoose.connection.on('error', (error) => {
  log.error(`Mongoose connection error: ${error}`)
})

mongoose.connection.on('disconnected', () => {
  log.info('Mongoose connection disconnected')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log.info('Mongoose connection disconnected through app termination')
    process.exit(0)
  })
})

export default mongoose
