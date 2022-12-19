<script lang="ts">
    import { page } from '$app/stores';
	import MarkdownEditor from '$lib/MarkdownEditor.svelte';
	import Navbar from "$lib/Navbar.svelte";
	import { onMount } from "svelte";
    import type { LayoutData } from './$types'

    export let data: LayoutData;

    let _location = ""
    onMount(() => {
        _location = location.href;
    })

    $: post = data.threads[parseInt($page.params.id)]
    
</script>
<Navbar data={data.locals}></Navbar>


<div class="main-container">
    <h1>{post?.name}</h1>
    
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