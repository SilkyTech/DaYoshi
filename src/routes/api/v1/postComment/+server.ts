import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database'
 
export const POST = (async ({ url, }) => {
    let token = url.searchParams.get('token');
    let content = url.searchParams.get('content');
    let postId = parseInt(url.searchParams.get('post') ?? "")
    if (token === null || content === null) {
        throw error(400, "")
    }

    let authorUsername = await db.user.findUnique({
        where: {
            userAuthToken: token
        }
    })

    if (authorUsername) {
        await db.comment.create({
            data: {
                content: content,
                authorId: authorUsername.id,
                postId: postId,
            }
        })
        return new Response("created post")
    } else throw error(400, "")
    
}) satisfies RequestHandler;