import { get } from 'svelte/store';
import i18n from '$lib/services/i18n/index';
import type { CharacterKey } from '$lib/types/keys/CharacterKey';
import type { WeaponKey } from '$lib/types/keys/WeaponKey';
import { createQuery, type CreateQueryResult, type QueryClient } from '@tanstack/svelte-query';
import { backendFetch } from '$lib/services/backend/index';
import type { CharacterIndex } from '$lib/types/index/character';
import type { WeaponIndex } from '$lib/types/index/weapon';
import type { Character } from '$lib/types/data/Character';
import type { Weapon } from '$lib/types/data/Weapon';
import type { mergedAchievements } from '$lib/types/achievement';

type FetchCharacterDataIndexResponse = CharacterIndex;
type FetchWeaponDataIndexResponse = WeaponIndex;

export class BackendDataService {
	private readonly baseUrl: string;

	public constructor(
		baseUrl: string,
		private queryClient: QueryClient
	) {
		this.baseUrl = baseUrl + '/data';
	}

	fetchCharacterDataIndex() {
		return createQuery<FetchCharacterDataIndexResponse>(
			{
				queryKey: ['fetchDataIndex', 'character'],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () =>
					await backendFetch<CharacterIndex>(
						`${this.baseUrl}/Character/index?lang=${get(i18n).language}`
					)
			},
			this.queryClient
		);
	}

	fetchWeaponDataIndex() {
		return createQuery<FetchWeaponDataIndexResponse>(
			{
				queryKey: ['fetchDataIndex', 'weapon'],
				staleTime: 6 * 60 * 60 * 1000, //6h
				queryFn: async () =>
					await backendFetch<WeaponIndex>(
						`${this.baseUrl}/Weapon/index?lang=${get(i18n).language}`
					)
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

	fetchAchievementCategoryList(lang: string): CreateQueryResult<string[]> {
		return createQuery(
			{
				queryKey: ['fetchAchievementCategoryList', lang],
				queryFn: async () => await backendFetch(this.getAchievementCategoryListUrl(lang))
			},
			this.queryClient
		);
	}

	getAchievementCategoryListUrl(lang: string): string {
		return `${this.baseUrl}/Achievement/index?lang=${lang}`;
	}

	fetchAchievements(lang: string, category: string): CreateQueryResult<mergedAchievements> {
		return createQuery(
			{
				queryKey: ['fetchAchievement', lang, category],
				queryFn: async () => await backendFetch(this.getAchievementListUrl(lang, category))
			},
			this.queryClient
		);
	}

	getAchievementListUrl(lang: string, category: string): string {
		return `${this.baseUrl}/Achievement/${category}?lang=${lang}`;
	}
}
