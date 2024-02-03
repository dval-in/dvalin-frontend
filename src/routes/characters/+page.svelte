<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiSort, mdiFilterOutline, mdiViewList, mdiViewGrid } from '@mdi/js';
</script>

<div class="col-span-2 row-span-2">
	<p style="font-size: 32px"><b>Characters</b></p>
</div>

<div class="flex items-center rounded-lg border-2 my-3 text-black bg-foreground/10">
	<input type="text" class="w-full px-4 py-2 rounded-lg" placeholder="Search Characters..." />
	<Button class="px-4 py-2 bg-primary text-text rounded-lg"
		><Icon path={[mdiSort]} color="fill-sidebarText group-hover:fill-white" />Sort By
	</Button>
	<Button class="px-4 py-2 bg-primary text-text rounded-lg"
		><Icon path={[mdiFilterOutline]} color="fill-sidebarText group-hover:fill-white" />Filter By
	</Button>
	<Button class="px-4 py-2 bg-primary text-text rounded-lg"
		><Icon path={[mdiViewList]} color="fill-sidebarText group-hover:fill-white" />
	</Button>
	<Button class="px-4 py-2 bg-primary text-text rounded-lg"
		><Icon path={[mdiViewGrid]} color="fill-sidebarText group-hover:fill-white" />
	</Button>
</div>

<br />
<div class="relative flex items-center flex-wrap mx-24">

	<a href="alhaitham">
		<div
			class="relative flex flex-col mt-6 text-text bg-foreground shadow-md bg-clip-border rounded-xl w-80 mx-3"
		>
			<div
				class="relative h-40 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			>
				<img
					src="https://i.pinimg.com/736x/b2/2a/ad/b22aad873bb14b5a6837489cab2f84ac.jpg"
					alt="Alhaitham"
				/>
			</div>
			<div class="p-6">
				<h5
					class="block mb-2 text-xl text-center antialiased font-semibold leading-snug tracking-normal text-text"
				>
					Alhaitham
				</h5>
			</div>
		</div>
	</a>

	<a href="aloy">
		<div
			class="relative flex flex-col mt-6 text-text bg-foreground shadow-md bg-clip-border rounded-xl w-80 mx-3"
		>
			<div
				class="relative h-40 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			>
				<img
					src="https://gamefinity.id/wp-content/uploads/2022/04/Aloy-Genshin-Impact.jpg"
					alt="Aloy"
				/>
			</div>
			<div class="p-6">
				<h5
					class="block mb-2 text-xl text-center antialiased font-semibold leading-snug tracking normal text-text"
				>
					Aloy
				</h5>
			</div>
		</div>
	</a>

	<a href="amber">
		<div
			class="relative flex flex-col mt-6 text-text bg-foreground shadow-md bg-clip-border rounded-xl w-80 mx-3"
		>
			<div
				class="relative h-40 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			>
				<img src="" alt="Amber" />
			</div>
			<div class="p-6">
				<h5
					class="block mb-2 text-xl text-center antialiased font-semibold leading-snug tracking normal text-text"
				>
					Amber
				</h5>
			</div>
		</div>
	</a>
	<a href="AratakiItto">
		<div
			class="relative flex flex-col mt-6 text-text bg-foreground shadow-md bg-clip-border rounded-xl w-80 mx-3"
		>
			<div
				class="relative h-40 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			>
				<img src="" alt="Arataki Itto" />
			</div>
			<div class="p-6">
				<h5
					class="block mb-2 text-xl text-center antialiased font-semibold leading-snug tracking normal text-text"
				>
					Arataki Itto
				</h5>
			</div>
		</div>
	</a>
	<a href="baizhu">
		<div
			class="relative flex flex-col mt-6 text-text bg-foreground shadow-md bg-clip-border rounded-xl w-80 mx-3"
		>
			<div
				class="relative h-40 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			>
				<img src="" alt="Baizhu" />
			</div>
			<div class="p-6">
				<h5
					class="block mb-2 text-xl text-center antialiased font-semibold leading-snug tracking normal text-text"
				>
					Baizhu
				</h5>
			</div>
		</div>
	</a>
</div>


<div class="relative flex items-center flex-col flex-wrap mt-6 text-text bg-foreground shadow-md bg-clip-border rounded-xl w-80 mx-24">
    <a href="albedo">
        <Card.Root>
            <Card.Content>
                <div
				class="relative h-50 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			    >
				    <img 
                        src="https://www.ginx.tv/uploads/pasted_image_0-137.png" 
                        alt="Albedo" />
			    </div>
			    <div class="p-1">
				    <h5
					class="block mb-1 text-xl text-center antialiased font-semibold leading-snug tracking-normal text-text"
				    >
					    Albedo
				    </h5>
                </Card.Content>
        </Card.Root>
    </a>
    <a href="alhaitham">
        <Card.Root>
            <Card.Content>
                <div
				class="relative h-50 mx-4 mt-6 overflow-hidden text-text shadow-lg bg-clip-border rounded-xl bg-foreground shadow-background/40"
			    >
				    <img 
                        src="https://i.pinimg.com/736x/b2/2a/ad/b22aad873bb14b5a6837489cab2f84ac.jpg" 
                        alt="Alhaitham" />
			    </div>
			    <div class="p-1">
				    <h5
					class="block mb-1 text-xl text-center antialiased font-semibold leading-snug tracking-normal text-text"
				    >
					    Alhaitham
				    </h5>
                </Card.Content>
        </Card.Root>
    </a>
</div>
