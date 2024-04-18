import { get } from 'svelte/store';
import i18n from '$lib/services/i18n/index';
import type { CharacterKey } from '$lib/types/keys/CharacterKey';
import type { WeaponKey } from '$lib/types/keys/WeaponKey';

export class BackendDataService {
	private readonly baseUrl: string;

	public constructor(baseUrl: string) {
		this.baseUrl = baseUrl + '/data';
	}

	getCharacterIndex() {
		return this.baseUrl + '/Character/index?lang=' + get(i18n).language;
	}

	getWeaponIndex() {
		return this.baseUrl + '/Weapon/index?lang=' + get(i18n).language;
	}

	getCharacter(character: CharacterKey) {
		return this.baseUrl + '/Character/' + character + '?lang=' + get(i18n).language;
	}

	getWeapon(weapon: WeaponKey) {
		return this.baseUrl + '/Weapon/' + weapon + '?lang=' + get(i18n).language;
	}
}
