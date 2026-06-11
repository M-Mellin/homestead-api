/**
 * Helmet security configuration module.
 *
 * @author Mattias Mellin <mm225vh@student.lnu.se> <mattias.mellin@gmail.com>
 * @version 1.0.0
 */
import helmet from 'helmet'

/**
 * Configures Helmet middleware with a custom Content Security Policy.
 *
 * @returns {import('express').RequestHandler} Configured Helmet middleware.
 */
export function setUpHelmetSecurity () {
  return helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'connect-src': ["'self'"],
        'script-src': ["'self'", 'cdn.jsdelivr.net']
      }
    }
  })
}
