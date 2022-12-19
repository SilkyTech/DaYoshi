<script lang="ts">
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

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