<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<Navbar data={{}}></Navbar>

<div class="center-panel">
    <h1>Register</h1>

    <form action="?/register" method="POST">
        <div>
            <label for="username">Username</label>
            <input type="text" required id="username" name="username">
        </div>
    
        <div>
            <label for="password">Password</label>
            <input type="password" required id="password" name="password">
        </div>
    
        {#if form?.message === "user"}
            <p class="error">Username is taken</p>
        {/if}
    
        <button type="submit">Register</button>
    </form>
    <a href="/login">Already have an account? Click this.</a>
</div>



<style lang="scss">
    .center-panel {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 30vw;
        height: 30vh;
        background-color: rgb(15, 15, 15);
        padding: 2rem;
        border-radius: 2rem;

        transition: width 200ms, height 200ms;
        &:hover {
            width: 35vw;
            height: 35vh;
        }

        & > a {
            color: white;
            text-decoration: none;
        }
    }
</style>