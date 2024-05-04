import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@ankit1478/common-mediumproject"

export const BlogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()


BlogRoute.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    // Bearer token => ["Bearer", "token"];
    const token = header.split(" ")[1]

    // @ts-ignore
    const response = await verify(token, c.env.JWT_SECRET)
    if (response) {
        c.set("userId", response.id);
        await next()
    } else {
        c.status(403)
        return c.json({ error: "unauthorized" })
    }
})


BlogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "input not correct"
        })
    }
    const authorId = c.get("userId");
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    });

    return c.json({
        id: post.id
    })
})


BlogRoute.put('/update', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "input not correct"
        })
    }

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });

        return c.json({
            id: post.id
        })

    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
})



BlogRoute.get('/get/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const postId = c.req.param('id');
    try {
        const users = await prisma.post.findFirst({
            where: {
                id: postId
            }
        })
        return c.json({ users });
    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }

})


BlogRoute.get('/getall', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const users = await prisma.post.findMany()
    return c.json({ users });
})