import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database'
 
export const POST = (async ({ url, request }) => {
    let token = url.searchParams.get('token');

    let json = await (request.json())
    let title = json.title;
    let content = json.content;
    let thread = json.thread;
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
        return new Response("created post")
    } else throw error(400, "")
    
}) satisfies RequestHandler;