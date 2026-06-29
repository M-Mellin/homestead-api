/**
 * Middleware for validating that the authenticated Firebase user exists in the database.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import { UserModel } from '../models/UserModel.js'

/**
 * Validates that the authenticated Firebase user exists in the database.
 *
 * Retrieves the user by Firebase UID from the request and attaches
 * it to the request object as `req.foundUser` for use in subsequent middleware.
 *
 * @param {import('express').Request} req - Express request object. Expects `req.user.uid` to be set by the authentication middleware.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Resolves when the user is found and attached to the request.
 */
export const validateUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      firebaseUid: req.user.uid
    })

    if (!user) {
      const error = new Error('User could not be found')
      error.status = 404
      throw error
    }

    req.foundUser = user
    next()
  } catch (error) {
    next(error)
  }
}
