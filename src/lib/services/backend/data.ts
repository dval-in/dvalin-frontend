import { get } from 'svelte/store';
import i18n from '$lib/services/i18n/index';
import type { CharacterKey } from '$lib/types/keys/CharacterKey';
import type { WeaponKey } from '$lib/types/keys/WeaponKey';
import { createQuery, type QueryClient } from '@tanstack/svelte-query';
import { backendFetch } from '$lib/services/backend/index';
import type { CharacterIndex } from '$lib/types/index/character';
import type { WeaponIndex } from '$lib/types/index/weapon';

interface FetchDataIndexResponse {
	character: CharacterIndex;
	weapon: WeaponIndex;
}

export class BackendDataService {
	private readonly baseUrl: string;

	public constructor(
		baseUrl: string,
		private queryClient: QueryClient
	) {
		this.baseUrl = baseUrl + '/data';
	}

	fetchDataIndex() {
		return createQuery<FetchDataIndexResponse>(
			{
				queryKey: ['fetchDataIndex'],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () => {
					const charIndex = await backendFetch<CharacterIndex>(
						`${this.baseUrl}/Character/index?lang=${get(i18n).language}`
					);
					const weaponIndex = await backendFetch<WeaponIndex>(
						`${this.baseUrl}/Weapon/index?lang=${get(i18n).language}`
					);

					return {
						character: charIndex,
						weapon: weaponIndex
					};
				}
			},
			this.queryClient
		);
	}

	getCharacter(character: CharacterKey) {
		return this.baseUrl + '/Character/' + character + '?lang=' + get(i18n).language;
	}

	getWeapon(weapon: WeaponKey) {
		return this.baseUrl + '/Weapon/' + weapon + '?lang=' + get(i18n).language;
	}
}
