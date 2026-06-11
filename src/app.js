/**
 * Express application factory module.
 *
 * Configures and creates the HomeStead Express application.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import express from 'express'
import cors from 'cors'

import { setUpHelmetSecurity } from './config/helmet.js'
import { morganLogger } from './config/morgan.js'
import { errorHandler } from './config/errorHandler.js'
import { router } from './routes/router.js'
import { requestContext } from './middlewares/requestContext.js'

/**
 * Creates and configures an Express application instance.
 *
 * Registers middleware, API routes, logging, security configuration,
 * request context handling, and centralized error handling.
 *
 * @param {string} [environment='development'] - Current application environment.
 * @returns {import('express').Application} Configured Express application.
 */
export const createApp = (environment = 'development') => {
  const app = express()

  app.use(setUpHelmetSecurity())
  app.use(cors())
  app.use(express.json({ limit: '500kb' }))
  app.use(morganLogger)

  app.use(requestContext())

  app.use('/', router)

  app.use(errorHandler({ environment }))

  return app
}
