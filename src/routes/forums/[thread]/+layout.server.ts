import type { LayoutServerLoad } from "./$types";
import { db } from '$lib/database'
import type { Thread } from "@prisma/client";


export const load: LayoutServerLoad = async ({locals}) => {
    let threads: Thread[] = []
    threads = (await db.thread.findMany({
        where: {},
        select: { posts: true, id: true, name: true },
    }))

    return {locals: locals, threads: threads}
}