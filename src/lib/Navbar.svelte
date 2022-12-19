<script lang="ts">
    export let data: any;
</script>

<div class="navbar">
    <a class="main-title" href="/"><img src="logo.png" alt="Da Yoshi"></a>
    <div class="navs">
        
        <a href="/forums">Forums</a>
        <a href="/game">Game</a>
        
        {#if data.user}
        <span>
            Logged in as {data.user.name}<br>
            <a href="/logout">Log out</a>
        </span>
        {:else}
        <a href="/login">Login</a>
        {/if}
    </div>
</div>

<style lang="scss">
    .navbar {
        width: 100vw;
        height: 100px;
        background-color: rgb(26, 26, 26);
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 2rem;
        box-sizing: border-box;
    }
    .main-title {
        & > img {
            height: 80px;
            transition: transform 200ms;
            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .navs {
        position: absolute;
        right: 10vw;
        display: flex;
        flex-direction: row;
        gap: 10vw;

        & > a {
            font-size: 1.5rem;
            color: white;
        }
    }
    </style>