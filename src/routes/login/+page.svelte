<script lang="ts">
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import BackendService from '$lib/services/backend';
	import Text from '$lib/components/typography/Text.svelte';
	import IconButton from '$lib/components/ui/icon-button/IconButton.svelte';
	import { mdiAccount, mdiDevices, mdiGithub, mdiGoogle, mdiMicrosoft, mdiServer } from '@mdi/js';
	import Icon from '$lib/components/ui/icon/icon.svelte';

	const backend = new BackendService();

	const nav = (url: string) => {
		window.location = url;
	};
</script>

<DefaultLayout title="Login">
	<div class="flex flex-1 flex-col sm:flex-row gap-6 items-center">
		<div class="flex flex-1 flex-col gap-6">
			<Text type="h2">Be able to do more with an Account!</Text>
			<div class="flex flex-row gap-4 items-center">
				<Icon size={2} path={mdiDevices} />
				<div class="flex flex-1 flex-col">
					<Text type="h4">Cross-device synchronization</Text>
					<Text type="p">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae deserunt
						velit autem veniam doloribus nulla. Culpa fugiat nemo accusantium cumque
						soluta tenetur tempora veritatis magnam nulla aliquid. Similique,
						perspiciatis unde?
					</Text>
				</div>
			</div>
			<div class="flex flex-row gap-4 items-center">
				<Icon size={2} path={mdiServer} />
				<div class="flex flex-1 flex-col">
					<Text type="h4">Access to server side functions</Text>
					<Text type="p">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae deserunt
						velit autem veniam doloribus nulla. Culpa fugiat nemo accusantium cumque
						soluta tenetur tempora veritatis magnam nulla aliquid. Similique,
						perspiciatis unde?
					</Text>
				</div>
			</div>
			<div class="flex flex-row gap-4 items-center">
				<Icon size={2} path={mdiAccount} />
				<div class="flex flex-1 flex-col">
					<Text type="h4">Share your personal profile</Text>
					<Text type="p">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae deserunt
						velit autem veniam doloribus nulla. Culpa fugiat nemo accusantium cumque
						soluta tenetur tempora veritatis magnam nulla aliquid. Similique,
						perspiciatis unde?
					</Text>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col gap-6">
			<IconButton
				icon={mdiGoogle}
				variant="ghost"
				on:click={() => nav(backend.auth.login('google'))}
			>
				Google
			</IconButton>
			<IconButton
				icon={mdiMicrosoft}
				variant="ghost"
				on:click={() => nav(backend.auth.login('microsoft'))}
			>
				Microsoft
			</IconButton>
			<IconButton
				icon={mdiGithub}
				variant="ghost"
				on:click={() => nav(backend.auth.login('github'))}
			>
				Github
			</IconButton>
		</div>
	</div>
</DefaultLayout>
