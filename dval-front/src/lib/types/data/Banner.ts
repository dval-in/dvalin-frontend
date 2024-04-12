export type Banner = {
	/**
	 * @TJS-required
	 */

	id: string;
	name: string;
	startTime: string;
	endTime: string;
	featured: ECharacter[] | EWeapon[];
	picture: string;
};

export type ECharacter = {
	/**
	 * @TJS-required
	 */

	id: string;
};

export type EWeapon = {
	/**
	 * @TJS-required
	 */

	id: string;
};
