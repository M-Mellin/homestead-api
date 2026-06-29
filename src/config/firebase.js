/**
 * Firebase Admin SDK configuration and initialization.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */
import admin from 'firebase-admin'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export default admin
