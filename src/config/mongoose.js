/**
 * Mongoose configuration module.
 *
 * Configures and manages the MongoDB database connection.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Connects to a MongoDB database.
 *
 * Registers MongoDB connection event listeners and gracefully closes
 * the database connection when the application terminates.
 *
 * @param {string} connectionString - The MongoDB connection string.
 * @returns {Promise<typeof mongoose>} Resolves when the database connection is established.
 */
export const connectDB = async (connectionString) => {
  const { connection } = mongoose

  connection.on('connected', () => console.log('MongoDB connection opened.'))
  connection.on('error', err => console.error(`MongoDB connection error occured: ${err}`))
  connection.on('disconnected', () => console.log('MongoDB is disconnected.'))

  process.on('SIGINT', async () => {
    try {
      await connection.close()
      console.log('MongoDB disconnected due to application termination.')
    } finally {
      process.exit(0)
    }
  })

  return mongoose.connect(connectionString)
}
