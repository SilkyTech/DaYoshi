<script lang="ts">
    import { page } from '$app/stores';
	import MarkdownEditor from '$lib/MarkdownEditor.svelte';
	import Navbar from "$lib/Navbar.svelte";
	import { Viewer } from 'bytemd';
	import { onMount } from "svelte";
    import type { LayoutData } from './$types'
    import gfm from '@bytemd/plugin-gfm'
	import type { Post } from '@prisma/client';

    export let data: LayoutData;

    let _location = ""
    onMount(async () => {
        _location = location.href;

        {
            let res = await fetch(`/api/v1/getUsername?uuid=${post.authorId}`, {
                method: "POST"
            })
            let data = await res.text();
            
            author = data
        }

        console.log(post)
    })
    
    $: post = (data.threads?.[data.threads.map(a => a.id).indexOf($page.params.thread)] ?? []).posts[parseInt($page.params.id)-1]
    let author = "...";
    
    $: comments = data.comments.filter((a: any) => a.postId === post.id)
        
    async function postComment() {
        await fetch(`/api/v1/postComment?token=${data.locals.user.token}&content=${encodeURI(commentVal)}&post=${post.id}`, {
            method: "POST"
        });
        location.reload();
    }
    let commentVal = ""

</script>
<Navbar data={data.locals}></Navbar>


<div class="main-container">
    <p>By {author}</p>
    <h1>{post.title}</h1>
    <Viewer plugins={[gfm()]} value={post?.content ?? ""}></Viewer>
    <hr>
    <h1> Comments:</h1><br>
    {#if data.user}
    Write a comment: <input type="text" bind:value={commentVal}> <button on:click={postComment}>Post</button>
    {/if}
    {#each comments as comment}
    <div class="comment">
        <span class="username">{comment.author.username}</span><br>
        <span class="comment-content" style="transform: translate(64px, 0px);">{comment.content === "" ? "<No content>" : comment.content}</span>
    </div>
    {/each}
</div>

<style lang="scss">
    .main-container {
        position: absolute;
        width: 80vw;
        min-height: 80vh;
        left: 50%;

        transform: translate(-50%, 0px);
        background-color: rgb(0, 0, 0, 0.1);
        padding: 8px;
    }

    .comment {
        border: 1px solid white;
    }
</style>