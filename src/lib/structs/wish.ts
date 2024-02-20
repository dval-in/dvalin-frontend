export interface Wish {
	type: 'weapon' | 'character';
	name: string;
	date: string;
	pity: number;
	rarity: number;
}
