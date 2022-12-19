<script lang="ts">
    import Navbar from "$lib/Navbar.svelte";
	import { onMount } from "svelte";
    import type { LayoutData } from './$types'

    export let data: LayoutData;

    let _location = ""
    onMount(() => {
        _location = location.href;
    })

    //$: threads = data.threads.map((thread, i) => ({name: thread.id, posts: thread.posts.length}))
</script>

<Navbar data={data.locals}></Navbar>

<h1 class="center">Threads:</h1>
<div class="main-container">
    {#each data.threads as thread}
        <div class="thread">
            <a class="thread-title" href={`${_location}/${thread.id}`}>{thread.name} - {thread.posts.length}</a>
        </div>
    {/each}
</div>

<style lang="scss">
    .center { text-align: center; }
    .main-container {
        position: absolute;
        width: 80vw;
        height: 60vh;
        left: 50%;

        transform: translate(-50%, 0px);
        background-color: rgb(0, 0, 0, 0.1);
        padding: 8px;
    }

    .thread {
        height: 64px;
        width: 100%;
        background-color: rgb(0, 0, 0, 0.1);
        text-align: center;
        display: flex;
        align-items: center;
        padding-left: 2rem;
        box-sizing: border-box;
        font-size: 1.5rem;
    }
</style>