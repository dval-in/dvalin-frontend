<script lang="ts">
    import { signIn, signOut } from '@auth/sveltekit/client';
    import { page } from '$app/stores';
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
</script>

{#if $page.data.session?.user}
    <p>Signed in as {$page.data.session.user.email}</p>
    <Button on:click={() => signOut}>Sign Out</Button
    >
    <img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
{:else}
    <p style="font-size: 21px"><b><u>Not Signed in</b></p>
    <br />

    <Button on:click={() => signIn('github')}>Github</Button
    >
{/if}