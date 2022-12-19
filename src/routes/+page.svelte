<script lang="ts">
	import { onMount } from 'svelte';
    import type { LayoutData } from './$types';

    export let data: LayoutData;
</script>

<h1>Yo</h1>
<h2>The main site isn't done yet</h2>
<h3>Visit <a href="/game">the game part</a> to play dayoshi.</h3>
<br>
<p>See this ugly page for now. Will update in the future.</p>
<br>
{#if data.user}
Logged in as {data.user.name}<br>
<a href="/logout">Log out</a>
{:else}
<a href="/signup">Sign Up</a>
<a href="/login">Log in</a>

{/if}
<br><br>
<br>
<h1>
    <strong>This game falls under the fair use of copyright from the section 107 of the Copyright Act of 1976.</strong>
</h1>