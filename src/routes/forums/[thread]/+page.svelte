<script lang="ts">
    import { page } from '$app/stores';
	import MarkdownEditor from '$lib/MarkdownEditor.svelte';
	import Navbar from "$lib/Navbar.svelte";
	import { onMount } from "svelte";
    import type { LayoutData } from './$types'

    export let data: LayoutData;

    let creatingPost = false;
    let _location = ""
    onMount(() => {
        _location = location.href;
    })

    let submit = () => {}
    let cancel = () => {}

    let _title_data: string = "";
    let _content_data: string = ""

    $: curThread = data.threads?.[data.threads.map(a => a.id).indexOf($page.params.thread)] ?? []
    function getPostData(): Promise<{
        title: string,
        content: string,
    }> {
        creatingPost = true;
        return new Promise((resolve, reject) => {
            submit = () => {
                resolve({title: _title_data, content: _content_data})
                _title_data = ""
                _content_data = ""
                creatingPost = false;
            }
            cancel = () => {
                reject("canceled")
                _title_data = ""
                _content_data = ""
                creatingPost = false;
            }
        } )
    }

    async function createPost() {
        if (data.user) {
            if (!creatingPost) {
                let postData = await getPostData();
                let res = await fetch(`/api/v1/createPost?token=${data.locals.user.token}`, {
                    method: "POST",
                    body: JSON.stringify({
                        title: postData.title,
                        content: postData.content,
                        thread: curThread.id
                    })
                })
                console.log(res, await res.text(), res.url)
            }
        } else {
            alert(`You aren't logged in! Please make an account to post.`)
        }
    }

    const names: {[id: string]: string} = {}

    onMount(() => {
        curThread.posts.forEach(a => {
            names[a.id] = "..."
        })

        curThread.posts.forEach(async a => {
            let res = await fetch(`/api/v1/getUsername?uuid=${a.authorId}`, {
                method: "POST",
            })
            let data = await res.text()
            names[a.id] = data;
        })
    })
</script>
<Navbar data={data.locals}></Navbar>


<div class="main-container">
    <div class="action-bar">
        <h1>Posts:</h1>
        <button on:click={createPost}>Create Post</button>
    </div>
    {#if creatingPost}
    <div class="create-post">
        <span class="create-post-title">Create a post:</span>
        <span>Title: </span><input type="text" bind:value={_title_data}><br>
        <span>Content: </span><MarkdownEditor bind:value={_content_data}></MarkdownEditor>
        <br><br>
        <button on:click={submit}>Create</button> <button on:click={cancel}>Cancel</button>
    </div>
    {/if}
    {#if curThread.posts.length === 0}
        Either this thread doesn't exist or there are no posts
    {/if}
    {#each curThread.posts as post}
        <div class="post">
            <a href={`${_location}/${post.id}`}>
                <span class="post-title">{post.title}</span>
                <span class="post-author">{names[post.id] ?? "..."}</span>
            </a>
        </div>
    {/each}
    
</div>

<style lang="scss">
    .action-bar {
        width: 80vw;
        height: 64px;
        display: flex;
        flex-direction: row;
        background-color: rgba(255, 255, 255, 0.01);
        align-items: center;
        position: relative;

        & > h1 {
            position: absolute;
            left: 1rem;
        }

        & > button {
            position: absolute;
            right: 1rem;
        }
    }

    .post {
        width: 100%;
        height: 64px;
        border: 2px solid gray;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.5rem;
        padding: 8px;
        box-sizing: border-box;
        position: relative;

        & > a {
            color: white;
            text-decoration: none;
        }
    }

    .post-author {
        position: absolute;
        right: 8px;
        font-size: 16px;
    }

    .main-container {
        position: absolute;
        width: 80vw;
        min-height: 60vh;
        left: 50%;

        transform: translate(-50%, 0px);
        background-color: rgb(0, 0, 0, 0.1);
        padding: 8px;
    }
</style>