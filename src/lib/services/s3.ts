import type { CharacterKey } from '$lib/types/keys/CharacterKey';
import type { WeaponKey } from '$lib/types/keys/WeaponKey';
import type { ArtifactSetKey } from '$lib/types/keys/ArtifactSetKey';

export default class S3Service {
	static baseUrl: string = 'https://s3-api.dval.in';

	static getEventLink(lang: string, year: number, month: number): string {
		return S3Service.baseUrl + '/event/' + lang + '/' + year + '/' + month;
	}

	static getCharacterLink(character: CharacterKey): string {
		return S3Service.baseUrl + '/character/' + character;
	}

	static getWeaponLink(weapon: WeaponKey): string {
		return S3Service.baseUrl + '/weapons/' + weapon;
	}

	static getArtifactLink(artifact: ArtifactSetKey): string {
		return S3Service.baseUrl + '/artifacts/' + artifact;
	}
}
