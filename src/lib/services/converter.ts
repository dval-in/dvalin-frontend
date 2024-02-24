import type { PaimonData } from '$lib/structs/paimon_data';
import type { ApplicationState, Settings } from '$lib/structs/application_state';

export default class ConverterService {
	static convertPaimonDataToApplicationState(
		paimonData: PaimonData,
		settings: Settings
	): ApplicationState {
		return {
			achievements: {},
			characters: {},
			settings: {
				...settings
			},
			tcg: {},
			user: {
				ar: paimonData.ar,
				server: 'eu',
				uid: paimonData['wish-uid'],
				wl: paimonData.wl
			},
			weapons: {},
			wishes: {
				bannerHistory: {
					character: paimonData['wish-counter-character-event'].pulls.flatMap((pull) => {
						return {
							type: pull.type,
							name: pull.id,
							date: pull.time,
							pity: pull.pity,
							rarity: Math.floor(Math.random() * 3) + 3
						};
					}),
					weapon: paimonData['wish-counter-weapon-event'].pulls.flatMap((pull) => {
						return {
							type: pull.type,
							name: pull.id,
							date: pull.time,
							pity: pull.pity,
							rarity: Math.floor(Math.random() * 3) + 3
						};
					}),
					standard: paimonData['wish-counter-standard'].pulls.flatMap((pull) => {
						return {
							type: pull.type,
							name: pull.id,
							date: pull.time,
							pity: pull.pity,
							rarity: Math.floor(Math.random() * 3) + 3
						};
					})
				}
			}
		};
	}
}
