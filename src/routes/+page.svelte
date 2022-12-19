<script lang="ts">
import { onMount } from 'svelte';
    import type { LayoutData } from './$types';
    import Navbar from '$lib/Navbar.svelte';

    import './home.scss'

    export let data: LayoutData;

    
</script>

<Navbar data={data}></Navbar>

<div class="main-content">
    {#if !data.user}
    <h1>Yo.</h1>
    <p>Welcome to Da Yoshi, the only game where you can hit yoshi.</p>
    <p>It looks like <strong>you</strong> don't have an account!</p>
    <p>Make one now to play the game!</p>
    <p>It's really quick with no annoying email verification stuff.</p>
    {:else}
    <h1>Welcome back, {data.user.name}</h1>
    <p>Check out the new <a href="/forums"><i>forums</i></a> where you can discuss about Da Yoshi.</p>
    <p>Play the game <a href="/game">here</a>.</p>
    <p>Thank you for loving Da Yoshi so much!</p>
    {/if}
    <br><br>
    <br>
    <p>
        <strong>This game falls under the fair use of copyright from the section 107 of the Copyright Act of 1976.</strong>
    </p>
</div>


<style lang="scss">
    .main-content {
        text-align: center;

        & > h1 {
            font-size: 3rem;
        }
        & > p {
            font-size: 1.2rem;
        }
    }
</style>