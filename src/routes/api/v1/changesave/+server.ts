import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database'
 
export const POST = (async ({ url }) => {
    let token = url.searchParams.get("token");
    let value = url.searchParams.get("value");
    if (token === null || value === null) {
        throw error(400, "")
    }

    let user = await db.user.findFirst({
        where: {
            userAuthToken: token
        },
    })

    if (user) {
        await db.user.update({
            where: {
                userAuthToken: token
            },
            data: {
                save: value
            }
        })
        return new Response("OK")
    } else {
        throw error(400, "")
    }

}) satisfies RequestHandler;