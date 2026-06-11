/**
 * Centralised Express error-handling middleware.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import http from 'node:http'
import { logger } from '../config/winston.js'

/**
 * Centralised Express error-handling middleware.
 *
 * Handles application errors and formats responses differently depending
 * on the current environment. In production, generic and safe error
 * messages are returned to the client. In development, detailed debug
 * information including stack traces is included.
 *
 * @param {object} options - Middleware configuration options.
 * @param {string} options.environment - Current application environment.
 * @returns {import('express').ErrorRequestHandler} Express error-handling middleware.
 */
export function errorHandler ({ environment }) {
  return (err, req, res, next) => {
    const status = err.status || 500

    logger.error(err.message, {
      metadata: {
        status,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method
      }
    })

    // Production
    if (environment === 'production') {
      if (!err.status) {
        err.status = 500
        err.message = 'An unexpected condition was encountered'
      }

      if (err.status === 400) {
        err.message = 'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).'
      }

      if (err.status === 401) {
        err.message = 'Access token invalid or not provided.'
      }

      if (err.status === 403) {
        err.message = 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.'
      }

      if (err.status === 404) {
        err.message = 'The requested resource was not found.'
      }

      if (err.status === 409) {
        err.message = 'The request could not be completed due to a conflict'
      }

      return res.status(status).json({
        status_code: status,
        message: err.message
      })
    }

    // Development
    return res.status(status).json({
      status_code: status,
      error: http.STATUS_CODES[status],
      message: err.message,
      stack: err.stack
    })
  }
}
