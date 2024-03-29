import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import redis from '../../Redis'
import logger from '../../util/logger'

const isAuthorized = (token: string, clientIp: string, resolve: (user: any) => void, reject: () => void) => {
  const privateKey = fs.readFileSync('./private.pem', 'utf8')
  jwt.verify(
    token,
    privateKey,
    { algorithms: ['HS256'] },
    (err: Error | null, redisBody: any) => {
      if (err) {
        logger.error({ type: 'verify err', err })
        return reject()
      }
      redis.redisGet(redisBody.redisKey, (userStr: string) => {
        const user = JSON.parse(userStr)
        if (!user) {
          logger.error({type: 'auth', message: 'User not found'})
          return reject()
        }
        if (clientIp && user.ip !== clientIp) {
          logger.error({type: 'auth', message: 'ip does not match'})
          return reject()
        }

        // rewrite the token with a new expiry
        const expiry = new Date().getTime() + 60 * 60
        redis.redisSet({
          key: redisBody.redisKey,
          value: JSON.stringify(redisBody),
          expiry,
        })

        resolve(user)
      })
    }
  )
}

export default isAuthorized
