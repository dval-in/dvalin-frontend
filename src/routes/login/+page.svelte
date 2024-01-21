<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	// import * as Card from '$lib/components/ui/card';
</script>

{#if $page.data.session?.user}
	<p>Signed in as {$page.data.session.user.email}</p>
	<Button on:click={() => signOut}>Sign Out</Button>
{:else}
	<p style="font-size: 21px"><b><u>Not Signed in</u></b></p>
	<br />

	<Button on:click={() => signIn('github')}>Github</Button>
{/if}
