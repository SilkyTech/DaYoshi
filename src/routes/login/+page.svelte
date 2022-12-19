<script lang="ts">
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<h1>Register</h1>

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