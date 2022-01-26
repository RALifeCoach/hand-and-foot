import * as express from 'express'
import * as http from 'http'
import socketManager from './src/socket/socketManager'
import ApiRoutes from './src/routes/ApiRoutes'
import AuthenticationRoutes from './src/routes/authentication/AuthenticationRoutes'
import * as dotenv from 'dotenv'
import * as helmet from 'helmet'
import * as requestIp from 'request-ip'
import logger from './src/util/logger'

const bodyParser = require('body-parser')

const ipMiddleware = function (req: any, res: any, next: any) {
  req.clientIp = requestIp.getClientIp(req)
  next()
}

dotenv.config()

const app = express()

app.use(function (req, res, next) {
  logger.info('request', req.url)
  next()
})

app.use(helmet())
app.disable('x-powered-by')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(ipMiddleware)

// app.use("/api", AuthCheckMiddleware, ApiRoutes());
app.use('/api', ApiRoutes())

app.use(function (req, res) {
  logger.info('404')
  logger.info(req.url)
  res.status(404).send('Sorry can\'t find that!')
})

const server = http.createServer(app)
server.listen(process.env.PORT || 8999, () => {
  logger.info(`Server started on port ${process.env.PORT || 8999} :)`)

  socketManager(server)
})
