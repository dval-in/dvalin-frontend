<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Icon from '$lib/components/ui/icon/icon.svelte';
	import { mdiFilterOutline, mdiSort, mdiViewGrid, mdiViewList } from '@mdi/js';
	import CharCard from '$lib/components/ui/card/CharCard.svelte';
	import CharList from '$lib/components/ui/card/CharList.svelte';

	let view = true;
	function ChangeViewType() {
		view != view;	
	}
</script>

<div class="col-span-2 row-span-2">
	<p style="font-size: 32px"><b>Characters</b></p>
</div>

<div class="flex items-center rounded-lg border-2 my-3 text-black bg-foreground/10">
	<input type="text" class="w-full px-4 py-2 rounded-lg" placeholder="Search Characters..." />
	<Button class="px-4 py-2 bg-primary text-text rounded-lg">
		<Icon path={[mdiSort]} color="fill-sidebarText group-hover:fill-white" />
		Sort By
	</Button>
	<Button class="px-4 py-2 bg-primary text-text rounded-lg">
		<Icon path={[mdiFilterOutline]} color="fill-sidebarText group-hover:fill-white" />
		Filter By
	</Button>
	<Button class="px-4 py-2 bg-primary text-text rounded-lg">
		<Icon path={[mdiViewList]} color="fill-sidebarText group-hover:fill-white" />
	</Button>
	<Button class="px-4 py-2 bg-primary text-text rounded-lg">
		<Icon path={[mdiViewGrid]} color="fill-sidebarText group-hover:fill-white" />
	</Button>
</div>

<br />

<div
	class="flex flex-row items-center flex-wrap mt-6 text-text shadow-md bg-clip-border rounded-xl mx-12"
>
	<CharCard link="albedo/" name="Albedo" img="https://www.ginx.tv/uploads/pasted_image_0-137.png" />
	<CharCard link="alhaitham/" name="Alhaitham" img="https://i.pinimg.com/736x/b2/2a/ad/b22aad873bb14b5a6837489cab2f84ac.jpg" />
	<CharCard link="aloy/" name="Aloy" img="https://gamefinity.id/wp-content/uploads/2022/04/Aloy-Genshin-Impact.jpg" />
	<CharCard link="amber/" name="Amber" img="" />
    <CharCard link="arataki-itto/" name="Arataki Itto" img="" />
    <CharCard link="baizhu/" name="Baizhu" img="" />
    <CharCard link="barbara/" name="Barbara" img="" />
    <CharCard link="beidou/" name="Beidou" img="" />
    <CharCard link="bennett/" name="Bennett" img="" />
    <CharCard link="candace/" name="Candace" img="" />
    <CharCard link="charlotte/" name="Charlotte" img="" />
    <CharCard link="chevreuse/" name="Chevreuse" img="" />
    <CharCard link="chongyun/" name="Chongyun" img="" />
    <CharCard link="collei/" name="Collei" img="" />
    <CharCard link="cyno/" name="Cyno" img="" />
    <CharCard link="dehya/" name="Dehya" img="" />
    <CharCard link="diluc/" name="Diluc" img="" />
    <CharCard link="diona/" name="Diona" img="" />
    <CharCard link="dori/" name="Dori" img="" />
    <CharCard link="eula/" name="Eula" img="" />
    <CharCard link="faruzan/" name="Faruzan" img="" />
    <CharCard link="fischl/" name="Fischl" img="" />
    <CharCard link="freminet/" name="Freminet" img="" />
    <CharCard link="furina/" name="Furina" img="" />
    <CharCard link="ganyu/" name="Ganyu" img="" />
    <CharCard link="hu-tao/" name="Hu Tao" img="" />
    <CharCard link="jean/" name="Jean" img="" />
    <CharCard link="kaedehara-kazuha/" name="Kaedehara Kazuha" img="" />
    <CharCard link="kaeya/" name="Kaeya" img="" />
    <CharCard link="kamisato-ayaka/" name="Kamisato Ayaka" img="" />
    <CharCard link="kamisato-ayato/" name="Kamisato Ayato" img="" />
    <CharCard link="kaveh/" name="Kaveh" img="" />
    <CharCard link="keqing/" name="Keqing" img="" />
    <CharCard link="kirara/" name="Kirara" img="" />
    <CharCard link="klee/" name="Klee" img="" />
    <CharCard link="kujou-sara/" name="Kujou Sara" img="" />
    <CharCard link="kuki-shinobu/" name="Kuki Shinobu" img="" />
    <CharCard link="layla/" name="Layla" img="" />
    <CharCard link="lisa/" name="Lisa" img="" />
    <CharCard link="lynette/" name="Lynette" img="" />
    <CharCard link="lyney/" name="Lyney" img="" />
    <CharCard link="mika/" name="Mika" img="" />
    <CharCard link="mona/" name="Mona" img="" />
    <CharCard link="nahida/" name="Nahida" img="" />
    <CharCard link="navia/" name="Navia" img="" />
    <CharCard link="neuvillette/" name="Neuvillette" img="" />
    <CharCard link="nilou/" name="Nilou" img="" />
    <CharCard link="ningguang/" name="Ningguang" img="" />
    <CharCard link="noelle/" name="Noelle" img="" />
    <CharCard link="qiqi/" name="Qiqi" img="" />
    <CharCard link="raiden-shogun/" name="Raiden Shogun" img="" />
    <CharCard link="razor/" name="Razor" img="" />
    <CharCard link="rosaria/" name="Rosaria" img="" />
    <CharCard link="sangonomiya-kokomi/" name="Sangonomiya Kokomi" img="" />
    <CharCard link="sayu/" name="Sayu" img="" />
    <CharCard link="shenhe/" name="Shikanoin Heizou" img="" />
    <CharCard link="shikanoin-heizou/" name="" img="" />
    <CharCard link="sucrose/" name="Sucrose" img="" />
    <CharCard link="tartaglia/" name="Tartaglia" img="" />
    <CharCard link="thoma/" name="Thoma" img="" />
    <CharCard link="tighnari/" name="Tighnari" img="" />
    <CharCard link="traveler/" name="Traveler" img="" />
    <CharCard link="venti/" name="Venti" img="" />
    <CharCard link="wanderer/" name="Wanderer" img="" />
    <CharCard link="wriothesley/" name="Wriothesley" img="" />
    <CharCard link="xiangling/" name="Xiangling" img="" />
    <CharCard link="xiao/" name="Xiao" img="" />
    <CharCard link="xingqiu/" name="Xingqiu" img="" />
    <CharCard link="xinyan/" name="Xinyan" img="" />
    <CharCard link="yae-miko/" name="Yae Miko" img="" />
    <CharCard link="yanfei/" name="Yanfei" img="" />
    <CharCard link="yaoyao/" name="Yaoyao" img="" />
    <CharCard link="yoimiya/" name="Yoimiya" img="" />
    <CharCard link="yun-jin/" name="Yun Jin" img="" />
    <CharCard link="zhongli/" name="Zhongli" img="" />
</div>


<div>
	<CharList link="albedo" name="Albedo" img="https://www.ginx.tv/uploads/pasted_image_0-137.png" hp={100} atk={100} def={100}/>
</div>