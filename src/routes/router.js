/**
 * Main application router module.
 *
 * Registers API route modules, download routes,
 * and fallback error handling routes.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import express from 'express'
import http from 'node:http'

import { router as userRouter } from './api/v1/userRouter.js'

export const router = express.Router()

router.use('/api/v1/users', userRouter)

/**
 * Catch-all route for undefined endpoints.
 */
router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
