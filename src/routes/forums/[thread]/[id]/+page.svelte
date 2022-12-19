<script lang="ts">
    import { page } from '$app/stores';
	import MarkdownEditor from '$lib/MarkdownEditor.svelte';
	import Navbar from "$lib/Navbar.svelte";
	import { Viewer } from 'bytemd';
	import { onMount } from "svelte";
    import type { LayoutData } from './$types'
    import gfm from '@bytemd/plugin-gfm'

    export let data: LayoutData;

    let _location = ""
    onMount(() => {
        _location = location.href;
    })

    $: post = (data.threads?.[data.threads.map(a => a.id).indexOf($page.params.thread)] ?? []).posts[parseInt($page.params.id)-1]
    
</script>
<Navbar data={data.locals}></Navbar>


<div class="main-container">
    <h1>{post.title}</h1>
    <Viewer plugins={[gfm()]} value={post?.content ?? ""}></Viewer>
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
</style>