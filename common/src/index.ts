<<<<<<< HEAD
import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string()
});

export type UpdatePostType = z.infer<typeof updatePostInput>;
=======
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { UserRoute } from './routes/user'
import { BlogRoute } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()


app.route("/api/v1/user", UserRoute);
app.route("/api/v1/blog", BlogRoute);


export default app
>>>>>>> 8bd7c092cc5a458140877a8307da6d3ce86f895c
