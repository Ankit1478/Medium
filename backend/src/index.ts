import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { UserRoute } from './routes/user'
import { BlogRoute } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.use('/*', cors())
app.route("/api/v1/user", UserRoute);
app.route("/api/v1/blog", BlogRoute);


export default app
