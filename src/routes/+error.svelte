<script lang="ts">
	import Text from '$lib/components/typography/Text.svelte';
	import DefaultLayout from '$lib/components/layout/DefaultLayout.svelte';
	import { page } from '$app/stores';

	let quoteGenerator: { quote: string; author: string }[] = [
		{
			quote: "Going out into the world and investigating, turning the 'unknown' into the 'known.'",
			author: '- Albedo'
		},
		{ quote: "Every journey has its final day. Don't rush.", author: '- Zhongli' },
		{
			quote:
				"When you don't know what to do, just take the first step. The rest will figure itself out naturally.",
			author: '- Beidou'
		},
		{
			quote:
				"The world is just a stage. It's better to laugh than to cry because laughter is of human nature. Laugh at it all, don't worry. Let's enjoy today",
			author: '- Furina'
		},
		{
			quote:
				"Well then, ladies and genlemen, allow me to use the words of the magician himself: 'You never know what can happen in the blink of an eye.'",
			author: '- Furina'
		},
		{
			quote:
				'Eternity stretches things out over a long time. But each moment within it becomes all the more fragile.',
			author: '- Scaramouche'
		},
		{
			quote:
				"It's the way of the world. Human life is worthless. They were always going to die, with or without a Delusion. At least having one gives them a chance to fulfill their ambitions.",
			author: '- Scaramouche'
		},
		{
			quote: 'Just like a bubble on the water. Beautiful for a moment, then total destruction.',
			author: '- Scaramouche'
		},
		{
			quote: 'Reality is the stillness buried deep beneath the illusion.',
			author: '- Raiden Shogun'
		},
		{
			quote: 'With you by my side, though our mouths stay silent, my heart is at peace.',
			author: '- Raiden Shogun'
		},
		{ quote: 'Inactivity serves no purpose whatsoever.', author: '- Raiden Shogun' },
		{
			quote:
				"An 'ambition' is a yearning for something material, or a concrete outcome. It is finite in nature, and will be replaced by a new 'ambition' in due course.",
			author: '- Raiden Shogun'
		},
		{
			quote:
				'Do you wish to know the truth about the shooting stars at night? They are but fleeting moments of luminosity.',
			author: '- Raiden Shogun'
		},
		{
			quote:
				'The world remains constant over the centuries. But human life is like the dew at dawn or a bubble rising through water. Transitory.',
			author: '- Raiden Shogun'
		},
		{
			quote:
				"Observation is the first step of any experiment, but observing the current world doesn't satisfy me. It lacks an important dimension - that of time.",
			author: '- Il Dottore'
		},
		{
			quote:
				'Some ambitions have the power to heal wounds, to bring victory, to inspire hope. But some ambitions, outlive their masters, long after their soul ascends. They remain as they were in the beginning, burning bright and true, for all eternity.',
			author: '- Yae Miko'
		},
		{ quote: 'I need your actions, not your words.', author: '- Yae Miko' },
		{
			quote:
				"Humans are just fascinating creatures, that's why I'm so fond of them. They live such short lives, but for the time they're around, they shine as bright as the midday sun.",
			author: '- Yae Miko'
		},
		{
			quote:
				'So are we to just abandon the notion of progress... for the sake of wishful thinking?',
			author: '- Yae Miko'
		},
		{
			quote:
				'You will miss much by refusing progress. You seek to prevent loss, but have you considered all you are losing by remaining here in stasis for all eternity?',
			author: '- Yae Miko'
		},
		{ quote: 'Dreams are rich bundles of human wisdom.', author: '- Nahida' },
		{
			quote:
				"Life inherently has many rules and restrictions, each with its own significance and reason to exist. They can't be broken on a whim.",
			author: '- Nahida'
		},
		{
			quote:
				"Everything in this world runs in a loop. As for the truth... that's on you to find out. So no matter how strange or spooky things might look on the surface, maybe all they point to in the end is a small and simple secret. In the end, I'm just the Moon. The real Sun is long gone.",
			author: '- Nahida'
		},
		{
			quote:
				'Analogies are wonderful tools. They let you use existing knowledge to understand unfamiliar things.',
			author: '- Nahida'
		},
		{
			quote:
				'You should know that all power comes at a price. For every bit of power you gain, so too do you gain more responsibility.',
			author: '- Zhongli'
		},
		{
			quote:
				'Contracts cannot be used to define friendship, nor measure sentiment. So just what can we use to measure the weight of our emotions?',
			author: '- Zhongli'
		},
		{
			quote: 'Only once you know and respect death, can you truly understand the value of life.',
			author: '- Hu Tao'
		},
		{
			quote:
				'It is here that heart and soul are as one like clouds. Death is a constant for all among the multitudes that sit beneath the heavens.',
			author: '- Hu Tao'
		},
		{
			quote:
				'I gotta find something fun to do... sitting around doing nothing is a fate worse than death.',
			author: '- Hu Tao'
		},
		{
			quote:
				'Balance must be maintained, and yet destinies remain variable. Death has its own rules, and yet is still hard to predict. Remember - no matter where, no matter when, no matter what the reason - one should never poke fun at death.',
			author: '- Hu Tao'
		},
		{
			quote:
				'So we just need to fight monsters from the abyss and a dragon. No pressure or anything!',
			author: '- Paimon'
		},
		{ quote: "We make a great team, don't we?", author: '- Paimon' },
		{
			quote:
				"People say that a secret shared is a secret no more, but I like to think that true friends keep each other's secrets.",
			author: '- Navia'
		},
		{
			quote:
				"I always say that blind optimism isn't the answer - if you want a bright future, you have to go out and seize it with your own two hands!",
			author: '- Navia'
		},
		{
			quote:
				"You and my father are truly alike. You'd keep all kinds of things in your heart, and never say a word to anyone. It's not so much that you can't feel, but that you would never express anything.",
			author: '- Navia'
		},
		{
			quote:
				'In your eyes, the value of a human life is nothing compared to those cold laws you hold so dear.',
			author: '- Navia'
		},
		{
			quote:
				"There's no emotion behind your words - you only said those things because you felt like you should.",
			author: '- Navia'
		},
		{
			quote: 'The world is full of lost ballads just waiting to be rediscovered.',
			author: '- Venti'
		},
		{
			quote: 'Let us make music, not war, and resolve our conflicts through song.',
			author: '- Venti'
		},
		{
			quote:
				"Allow me to join you on your quest once again. I must see to it that the bards of the world tell the Traveler's tales!",
			author: '- Venti'
		},
		{
			quote:
				"Though I've long since viewed this scenery a great many times, there is something different about seeing it again with you. Surely you're not still concealing some other wondrous abilities? Hmm, even if you were, it would simply further prove that my intuition is correct.",
			author: '- Venti'
		},
		{
			quote: "This place is pretty dead... by which I mean, there's nothing to kill.",
			author: '- Tartaglia'
		},
		{
			quote:
				'A warrior must always be ready to face any challenge with his blade. The outcome of the battle is irrelevant - what matters is that you learn from the experience.',
			author: '- Tartaglia'
		},
		{
			quote: 'You know, there are better ways to seek out our enemies than... well, standing here.',
			author: '- Tartaglia'
		},
		{
			quote:
				'Comrade. Make sure you keep training too. Otherwise, who will be left to fight me to the death when the world lies defeated at my feet?',
			author: '- Tartaglia'
		},
		{
			quote:
				'If you make a promise, you keep it, if you make a mistake, you apologize. And if you give someone a dream, you defend it to the end.',
			author: '- Tartaglia'
		},
		{
			quote:
				"If you're suggesting that we escalate this from a verbal exchange to a physical one, I accept.",
			author: '- Alhaitham'
		},
		{
			quote:
				"I don't need to fight I only need to think. Everything is connected. All I have to do is find the weakest link, deal with the causal factors and everything else tends to resolve itself. Essentially, more time on contemplation, less time on execution.",
			author: '- Alhaitham'
		},
		{
			quote: "All intellectuals are lunatics in the eyes of fools. I'll take that as a compliment.",
			author: '- Alhaitham'
		},
		{
			quote: 'Those who understand the rules can delineate boundaries, and identify gray areas.',
			author: '- Alhaitham'
		},
		{
			quote:
				"To achieve this impossible task, it sounds like you'll need to fool your own heart first. Although it may feel like a trick, self-encouragement may be the most important tool we have.",
			author: '- Alhaitham'
		},
		{
			quote:
				"The point of discussion is to arrive at a solution. Let's cut the small talk and move to the next point.",
			author: '- Alhaitham'
		},
		{
			quote: 'There is always an opportunity for safety after danger passes.',
			author: '- Alhaitham'
		},
		{ quote: "I'm far from human. I can't make much of human emotions.", author: '- Xiao' },
		{
			quote: 'I deal in death. If you cannot bring yourself to kill - speak my name.',
			author: '- Xiao'
		},
		{
			quote: 'Many mortals fear lightning... incomprehensible. Fear of something so common.',
			author: '- Xiao'
		},
		{ quote: 'Reduced to just standing around. How absurd.', author: '- Xiao' },
		{
			quote: "Night... when the darkness comes to envelope you. Don't stay outside.",
			author: '- Xiao'
		},
		{ quote: "I'm flying with you in my heart.", author: '- Traveler' },
		{
			quote:
				"So... what you're trying to say is that you fell here from another world? But when you wanted to leave and go on to the next world, your path was blocked by some unknown god?",
			author: '- Traveler'
		},
		{
			quote: 'Some days, my mind wanders, and I fantasize about walking into the rain...',
			author: '- Neuvillette'
		},
		{ quote: 'When the tide comes in, I shall return...', author: '- Neuvillette' },
		{
			quote:
				'From my observations, humans have a tendency to view themselves as being in opposition with nature. And whenever this point is raised, someone is always quick to respond by declaring that humans are in fact a part of nature, like any other organism. To someone like me, however, who knows an inkling of the truth, what would be most beneficial is if human civilization and the natural world of this planet could seek ways to co-exist with one another.',
			author: '- Neuvillette'
		},
		{
			quote:
				'I see the value in my own work, but I also see the meaning in all the endeavors of the people of Fontaine. I believe I will continue to take pride in fulfilling my duties.',
			author: '- Neuvillette'
		},
		{
			quote:
				"Since you hail from beyond the stars, I invite you to be my witness as I judge this upended world. 'This realm dismantled was of the Formidable Father himself, but what now reigns here is a cluster of filthy feathers. Though we live in a world of disarray, I shall undertake to restore all that has been broken.'",
			author: '- Neuvillette'
		},
		{
			quote:
				'The time that I have spent living among the citizens of Fontaine, and traveling with you, has transformed my views. Even though before this I has pardoned the sins of humanity long ago, I can promise you that my future judgments will not cause any harm to the common folk. That being said, my grievances with the usurpers have yet to be settled... They owe a debt of blood that shall not be forgotten.',
			author: '- Neuvillette'
		},
		{
			quote:
				'A blade is like a tea-leaf. Only those who sample it many times can appreciate its true qualities.',
			author: '- Kamisato Ayaka'
		},
		{
			quote: "Close your eyes and face the wind... It feels wonderful, doesn't it?",
			author: '- Kamisato Ayaka'
		},
		{
			quote:
				'I only wish life could be as leisurely as this a little more often. How greedy of me.',
			author: '- Kamisato Ayaka'
		},
		{
			quote:
				"Was it one's thoughts that drew him to my dreams? Had I known it a dream, one would not have awakened.",
			author: '- Kamisato Ayaka'
		},
		{ quote: 'The ability to appreciate beauty is an important virtue.', author: '- Kaveh' },
		{
			quote: 'Sometimes, hopes and dreams bring suffering instead of happiness.',
			author: '- Kaveh'
		},
		{
			quote: 'Relax your mind, and let go of all your troubles. Have a good night.',
			author: '- Kaveh'
		},
		{
			quote:
				'Everything comes at a cost. And if you aspire to things that most could never dream of, then naturally, there will be an unimaginable price to pay.',
			author: '- Kamisato Ayato'
		},
		{
			quote: "Power is only a source of comfort when it is concentrated in one's own hands.",
			author: '- Kamisato Ayato'
		},
		{
			quote:
				"Troubles? Whenever something's troubling me, it must be dealt with swiftly and comprehensively. And whenever someone is troubling me... hehe.",
			author: '- Kamisato Ayato'
		},
		{
			quote:
				'm no stickler for doing things in a certain way. Whatever method you use, the important thing is that it delivers acceptable results.',
			author: '- Kamisato Ayato'
		},
		{
			quote:
				"I really like being with you. I don't know why, but it feels like a butterfly is trying to burst out of my chest... Anyway, how about I show a new dance to you?",
			author: '- Nilou'
		},
		{
			quote:
				"Sometimes, you can convey more with dance than words. If you don't know what to say, then just dance.",
			author: '- Nilou'
		},
		{
			quote: 'If you lie on the grass, you can feel the heartbeat of the world.',
			author: '- Ganyu'
		},
		{
			quote:
				"I don't understand why people insist on going all out to try and prove how their existence is more valuable than everyone else's. To exist in the first place is a beautiful thing, and that's enough... isn't it?",
			author: '- Ganyu'
		},
		{
			quote: 'With authority over a thousand comes responsibility to a thousand.',
			author: '- Ganyu'
		},
		{ quote: 'Mind be purged, world be saved.', author: '- Shenhe' },
		{
			quote:
				'Do you prefer the artificial light of the cities and towns, or the moonlight in the mountains?',
			author: '- Shenhe'
		},
		{
			quote: "If you feel fatigued after lunch, you should try meditating. It's very effective.",
			author: '- Shenhe'
		},
		{
			quote:
				'Fate is called as such, for it cannot be changed, nor can it be reversed. It can only but be accepted.',
			author: '- Mona'
		},
		{
			quote:
				'Astrologers must rid themselves of material desires. Only by ridding oneself of clutter can one see the true world around them.',
			author: '- Mona'
		},
		{
			quote:
				"Divination is about precisely foretelling one's written destiny. Over-embellishing that fate only leads to misconception.",
			author: '- Mona'
		},
		{
			quote:
				"As a Matra, it is one of my duties to help people 'remember' the mistakes they have made.",
			author: '- Cyno'
		},
		{
			quote:
				'The past cannot be changed, and the future cannot be foretold. As a result, I make sure to always cherish the here and now..',
			author: '- Cyno'
		},
		{
			quote: 'Good deeds and bad... in the end, all will be placed upon the scales.',
			author: '- Cyno'
		},
		{
			quote:
				"Luck can swing the results of a single game, but it's bound to run out sooner or later.",
			author: '- Cyno'
		},
		{
			quote:
				"Dear Anemo God, please make Klee's bombs blow in the right direction and only blow up bad guys. The end.",
			author: '- Klee'
		},
		{
			quote:
				"Once I'm out of solitary confinement and am done reflecting on my actions, we can go play together again, okay?",
			author: '- Klee'
		},
		{
			quote:
				"There's no style in resorting to violence, it's simply the worst of all the bad decisions you could make.",
			author: '- Ningguang'
		},
		{ quote: 'Do not trust your eyes! Your eyes can lie to you.', author: '- Ningguang' },
		{
			quote:
				'Gamblers always place their bets on the next dice roll... but the bankers always have the last laugh, and they never touch a single die.',
			author: '- Ningguang'
		},
		{
			quote:
				'Even if an antique is priceless, the happiness it brings lasts for only the moment you obtain it.',
			author: '- Ningguang'
		},
		{ quote: 'May the gentle breeze softly send thee into a sweet sleep.', author: '- Eula' },
		{
			quote:
				"Free from social mores and other people's opinions, and no family obligations... must be an easy life!",
			author: '- Eula'
		},
		{
			quote: "I'm not lazy, I just know to save my energy for when I need it most.",
			author: '- Lisa'
		},
		{
			quote: 'I can be your teacher, your master, or your friend... or all three if you want.',
			author: '- Lisa'
		},
		{
			quote: "It appears my combat abilities are advancing. Too bad it's not all cognitive.",
			author: '- Shikanoin Heizou'
		},
		{
			quote: "There's something in the air... something that tells me a new case is brewing.",
			author: '- Shikanoin Heizou'
		},
		{ quote: "No one's joined me on an adventure in ages. C'mon, let's go!", author: '- Bennett' },
		{
			quote:
				"Eh, it's not as bad as you've heard! Everyone falls into a trapper's pit or gets hit on the head by a falling tree now and then, right?",
			author: '- Bennett'
		},
		{
			quote: "I have a poor memory for most things. But as far as I know, that doesn't matter.",
			author: '- Qiqi'
		},
		{
			quote:
				'I understand. When I get stronger, I need to put more effort into controlling my strength.',
			author: '- Qiqi'
		},
		{ quote: 'Hey, do you know what? Uh, neither do I. I... already forgot.', author: '- Qiqi' },
		{
			quote:
				"If the gods haven't given up on me, I guess that means I shouldn't give up on me either.",
			author: '- Bennett'
		},
		{
			quote: "Perhaps if only time stands still, will the lightning's glow never fade.",
			author: '- The Omnipresent God'
		}
	];

	let randomQuote: { quote: string; author: string } = randomizeQuote();

	function randomizeQuote() {
		const randomIndex = Math.floor(Math.random() * quoteGenerator.length);
		return quoteGenerator[randomIndex];
	}
</script>

<DefaultLayout title="Error">
	<div>
		<Text type="h2">{randomQuote.quote}</Text>
		<Text type="h2">{randomQuote.author}</Text>
	</div>
	<Text type="p">Code: {$page.error?.message}</Text>
</DefaultLayout>
