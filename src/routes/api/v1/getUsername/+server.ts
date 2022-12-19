import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database'
 
export const POST = (async ({ url }) => {
    let uuid = url.searchParams.get("uuid")
    
    let user = await db.user.findUnique({
        where: { id: uuid ?? "" },
        select: { username: true }
    })

    if (user) {
        return new Response(user.username)
    } else throw error(400, 'uuid invalid')

}) satisfies RequestHandler;