/**
 * Request context middleware module.
 *
 * Provides middleware for attaching request-scoped context data
 * such as a unique request identifier.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import httpContext from 'express-http-context'
import { randomUUID } from 'node:crypto'

/**
 * Creates middleware that attaches a request-specific context.
 *
 * Generates a unique request identifier and stores the request
 * in the HTTP context for access throughout the request lifecycle.
 *
 * @returns {import('express').RequestHandler} Configured Express middleware.
 */
export function requestContext () {
  return (req, res, next) => {
    req.requestUuid = randomUUID()
    httpContext.set('request', req)
    next()
  }
}
