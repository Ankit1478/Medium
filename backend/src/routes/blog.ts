import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@ankit1478/common-mediumproject"

export const BlogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
        params: string
    },
    Variables: {
        userId: string
    }
}>()


BlogRoute.get('/getall', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const users = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({ users });
})

BlogRoute.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const postId = c.req.param('id');
    try {
        const users = await prisma.post.findFirst({
            where: {
                id: postId
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
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

BlogRoute.use('/*', async (c, next) => {
    const header = c.req.header("authorization");
    // Bearer token => ["Bearer", "token"];
    const token = header;

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
        id: post.id,
        user_id: authorId
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


BlogRoute.delete("/delete/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const token = c.req.header("authorization")
    if (!token) {
        return c.json({ msg: "Authentication token is missing" });

    }

    let userId;
    try {
        const decoded = await verify(token, c.env.JWT_SECRET);
        userId = decoded.id;
    } catch (e) {
        return c.json({ msg: "Invalid or expired token" });

    }

    const postId = await c.req.param("id");
    try {
        // Retrieve the post to check if the user is authorized to delete it
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return c.json({ msg: "Post not found" });

        }

        if (post.authorId !== userId) {
            return c.json({ msg: "User not authorized to delete this post" });

        }
        console.log(post.authorId);
        console.log(userId);

        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        return c.json({ message: "Successfully deleted blog" });
    } catch (e) {
        console.log(e);
        return c.json({ msg: "Failed to delete post" });
    }
});
