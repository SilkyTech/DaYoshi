<script lang="ts">
    import Navbar from "$lib/Navbar.svelte";
    import type { LayoutData } from './$types'

    export let data: LayoutData;
</script>

<Navbar data={data}></Navbar>

<div class="main-container">
    In progress...
</div>