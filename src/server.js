/**
 * Application entry point.
 *
 * Connects to the database and starts the Express HTTP server.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import { connectDB } from './config/mongoose.js'
import { logger } from './config/winston.js'
import { createApp } from './app.js'

try {
  const { DB_CONNECTION_STRING, PORT, NODE_ENV } = process.env

  await connectDB(DB_CONNECTION_STRING)

  const app = createApp(NODE_ENV)

  const server = app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Server running at http://localhost:${server.address().port}`)
    logger.info('Press Ctrl-C to terminate...')
  })
} catch (err) {
  logger.error(err.message, { error: err })
  process.exitCode = 1
}
