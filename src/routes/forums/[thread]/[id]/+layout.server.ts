import type { LayoutServerLoad } from "../$types";
import { db } from '$lib/database'
import type { Thread } from "@prisma/client";
import { page } from "$app/stores";
import { get } from "svelte/store";


export const load: LayoutServerLoad = async ({locals}) => {
    let threads: Thread[] = []
    threads = await db.thread.findMany({
        where: {},
        select: { posts: true, id: true, name: true },
    })

    let comments = (await db.comment.findMany({
        where: {},
        select: { author: true, content: true, postId: true }
    }))
    

    return { locals: locals, threads: threads, comments }
}