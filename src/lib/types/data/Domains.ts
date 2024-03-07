type Item = {
	/**
	 * @TJS-required
	 */
	day: string;
	ids: string[];
};

type DomainType = {
	/**
	 * @TJS-required
	 */
	domainName: string;
	rotation: Item[];
};

export type Domains = {
	/**
	 * @TJS-required
	 */
	characters: DomainType[];
	weapons: DomainType[];
};
