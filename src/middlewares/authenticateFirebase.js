/**
 * User authentication middleware module.
 *
 * Verifies Firebase authentication tokens for authenticated users.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import admin from '../config/firebase.js'

/**
 * Authenticates a user using a Firebase ID token.
 *
 * Validates the Authorization header and attaches the decoded
 * Firebase user information to the request object.
 *
 * Authentication can be bypassed in development and test environments
 * by enabling the BYPASS_AUTH environment variable.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Resolves when authentication is completed.
 */
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      const error = new Error('Missing token')
      error.status = 401
      throw error
    }

    const token = authHeader.split('Bearer ')[1]

    try {
      const decodedToken = await admin.auth().verifyIdToken(token)
      req.user = decodedToken
    } catch {
      const error = new Error('Invalid or expired token')
      error.status = 401
      throw error
    }

    next()
  } catch (error) {
    next(error)
  }
}
