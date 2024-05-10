import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@ankit1478/common-mediumproject"


export const UserRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>()

UserRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "input not correct"
        })
    }

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            jwt: token
        })
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
})

UserRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "input not correct"
        })
    }


    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })
    if (!user) {
        c.status(403);
        return c.json({ error: "user not exists" })
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
        jwt: token
    })
})