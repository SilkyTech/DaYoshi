import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database'
 
export const POST = (async ({ url, }) => {
    let token = url.searchParams.get('token');
    let title = url.searchParams.get('title');
    let content = url.searchParams.get('content');
    let thread = url.searchParams.get('thread');
    if (token === null || title === null || content === null || thread === null) {
        throw error(400, "")
    }

    let authorUsername = await db.user.findUnique({
        where: {
            userAuthToken: token
        }
    })
    let _thread = await db.thread.findUnique({
        where: {
            id: thread
        },
    })

    if (authorUsername) {
        await db.thread.update({
            where: {id: thread},
            data: {
                posts: { 
                    create: {
                        title: title,
                        authorId: authorUsername!.id,
                        content: content,
                    }
                }
            }
        })
        console.log({title: title,
            authorId: authorUsername!.id,
            content: content})
        return new Response("created post")
    } else throw error(400, "")
    
}) satisfies RequestHandler;