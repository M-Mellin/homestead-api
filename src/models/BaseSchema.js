/**
 * Defines the base Mongoose schema used across the application.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const convertOptions = Object.freeze({
  getters: true,
  versionKey: false,
  /**
   * Transforms the document when converting it to a plain object.
   * Removes the internal MongoDB `_id` property.
   *
   * @param {object} doc - The mongoose document being converted.
   * @param {object} ret - The resulting plain object representation.
   * @returns {object} The transformed object.
   * @see https://mongoosejs.com/docs/api.html#document_Document-toObject
   */
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    return ret
  }
})

/**
 * Base schema shared by all mongoose models.
 *
 * @type {mongoose.Schema}
 */
const baseSchema = new mongoose.Schema({}, {
  timestamps: true,
  toObject: convertOptions,
  toJSON: convertOptions,
  optimisticConcurrency: false
})

export const BASE_SCHEMA = Object.freeze(baseSchema)
