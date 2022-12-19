<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<Navbar data={{}}></Navbar>

<div class="center-panel">
    <h1>Login</h1>

    <form action="?/login" method="POST">
        <div>
            <label for="username">Username</label>
            <input type="text" required id="username" name="username">
        </div>
    
        <div>
            <label for="password">Password</label>
            <input type="password" required id="password" name="password">
        </div>
    
        {#if form?.invalid}
            <p class="error">Username and password is required.</p>
        {/if}
    
        {#if form?.credentials}
            <p class="error">You have entered the wrong credentials.</p>
        {/if}
    
        <button type="submit">Login</button>
    </form>
    <a href="/signup">Don't have an account? Register one now!</a>
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