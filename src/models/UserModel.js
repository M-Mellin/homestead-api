/**
 * Defines the User mongoose model.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './BaseSchema.js'

const schema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },

  fcmToken: {
    type: String,
    default: null
  },

  // devices: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Device'
  //   }
  // ]
})

schema.add(BASE_SCHEMA)

/**
 * Mongoose model representing application users.
 *
 * @type {mongoose.Model}
 */
export const UserModel = mongoose.model('user', schema)
