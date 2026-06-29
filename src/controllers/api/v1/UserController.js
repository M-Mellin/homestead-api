/**
 * User controller module.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import { UserModel } from '../../../models/UserModel.js'

import crypto from 'crypto'
import bcrypt from 'bcrypt'

/**
 * User controller module.
 *
 * Handles user synchronization and device management operations.
 */
export class UserController {
  /**
   * Synchronizes a Firebase authenticated user with the database.
   *
   * Creates a new user if none exists, otherwise updates the existing user.
   *
   * @param {import('express').Request} req - Express request object.
   * @param {import('express').Response} res - Express response object.
   * @param {import('express').NextFunction} next - Express next middleware function.
   * @returns {Promise<void>} Resolves when the response has been sent.
   */
  async syncUser (req, res, next) {
    try {
      const { uid } = req.user || {}

      if (!uid) {
        const error = new Error('Invalid payload')
        error.status = 400
        throw error
      }

      const user = await UserModel.findOneAndUpdate(
        { firebaseUid: uid },
        { $setOnInsert: { firebaseUid: uid } },
        { upsert: true, returnDocument: 'after' }
      )

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
