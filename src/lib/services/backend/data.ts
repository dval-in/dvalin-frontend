import { get } from 'svelte/store';
import i18n from '$lib/services/i18n/index';
import type { CharacterKey } from '$lib/types/keys/CharacterKey';
import type { WeaponKey } from '$lib/types/keys/WeaponKey';
import { createQuery, type CreateQueryResult, type QueryClient } from '@tanstack/svelte-query';
import { backendFetch } from '$lib/services/backend/index';
import type { CharacterIndex } from '$lib/types/index/character';
import type { WeaponIndex } from '$lib/types/index/weapon';
import type { Character } from '$lib/types/data/Character';
import type { Weapon } from 'dvalin-data';
import type { mergedAchievements } from '$lib/types/achievement';
import type { AchievementCategoryIndex } from '$lib/types/index/achievement';

type FetchCharacterDataIndexResponse = CharacterIndex;
type FetchWeaponDataIndexResponse = WeaponIndex;
type FetchAchievementCategoryDataIndexResponse = AchievementCategoryIndex;

export class BackendDataService {
	private readonly baseUrl: string;

	public constructor(
		baseUrl: string,
		private queryClient: QueryClient
	) {
		this.baseUrl = baseUrl + '/data';
	}

	fetchCharacterDataIndex(lang: string) {
		return createQuery<FetchCharacterDataIndexResponse>(
			{
				queryKey: ['fetchDataIndex', 'character', lang],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () =>
					await backendFetch<CharacterIndex>(
						`${this.baseUrl}/Character/index?lang=${lang}`
					)
			},
			this.queryClient
		);
	}

	fetchWeaponDataIndex(lang: string) {
		return createQuery<FetchWeaponDataIndexResponse>(
			{
				queryKey: ['fetchDataIndex', 'weapon', lang],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () =>
					await backendFetch<WeaponIndex>(`${this.baseUrl}/Weapon/index?lang=${lang}`)
			},
			this.queryClient
		);
	}

	fetchAchievementCategoryDataIndex(lang: string) {
		return createQuery<FetchAchievementCategoryDataIndexResponse>(
			{
				queryKey: ['fetchDataIndex', 'AchievementCategory', lang],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () =>
					await backendFetch(`${this.baseUrl}/AchievementCategory/index?lang=${lang}`)
			},
			this.queryClient
		);
	}

	fetchCharacterData(lang: string, character: CharacterKey) {
		return createQuery<Character>(
			{
				queryKey: ['fetchCharacterData', lang, character],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () =>
					await backendFetch<Character>(this.getCharacterDataUrl(lang, character))
			},
			this.queryClient
		);
	}

	getCharacterDataUrl(lang: string, character: CharacterKey) {
		return `${this.baseUrl}/Character/${character}?lang=${lang}`;
	}

	fetchWeaponData(weapon: WeaponKey) {
		return createQuery<Weapon>(
			{
				queryKey: ['fetchWeaponData', weapon],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () => await backendFetch<Weapon>(this.getWeaponDataUrl(weapon))
			},
			this.queryClient
		);
	}

	getWeaponDataUrl(weapon: WeaponKey) {
		return `${this.baseUrl}/Weapon/${weapon}?lang=${get(i18n).language}`;
	}

	fetchAchievements(lang: string, category: string): CreateQueryResult<mergedAchievements> {
		return createQuery(
			{
				queryKey: ['fetchAchievement', lang, category],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () => await backendFetch(this.getAchievementDataUrl(lang, category))
			},
			this.queryClient
		);
	}

	getAchievementDataUrl(lang: string, category: string): string {
		return `${this.baseUrl}/Achievement/${category}?lang=${lang}`;
	}
}
