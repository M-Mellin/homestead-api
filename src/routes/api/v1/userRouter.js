/**
 * Defines API routes for user and device management.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import express from 'express'
import { UserController } from '../../../controllers/api/v1/UserController.js'
import { authenticateToken } from '../../../middlewares/authenticateFirebase.js'
import { validateUser } from '../../../middlewares/validateUser.js'

export const router = express.Router()

const controller = new UserController()

router.post('/me',
  authenticateToken,
  controller.syncUser.bind(controller)
)
