import type { CharacterKey } from '$lib/types/keys/CharacterKey';
import type { WeaponKey } from '$lib/types/keys/WeaponKey';
import type { ArtifactSetKey } from '$lib/types/keys/ArtifactSetKey';

export default class S3Service {
	static readonly baseUrl: string = 'https://s3-api.dval.in';

	public static getCharacter(character: CharacterKey) {
		return new S3CharacterBucket(character);
	}

	public static getWeapon(weapon: WeaponKey) {
		return new S3WeaponBucket(weapon);
	}

	public static getArtifact(artifact: ArtifactSetKey) {
		return new S3ArtifactBucket(artifact);
	}

	public static getNamecard(key: string) {
		return new S3NamecardBucket(key);
	}

	public static getAchievementCategory(achievementCategory: string) {
		return new S3AchievementBucket(achievementCategory);
	}
}

class S3NamecardBucket {
	public url: string;

	public constructor(key: string) {
		this.url = S3Service.baseUrl + '/namecards/' + key + '.webp';
	}
}

class S3CharacterBucket {
	private readonly baseUrl: string;

	public gachaCard;
	public gachaSplash;
	public icon;

	public constructor(character: CharacterKey) {
		this.baseUrl = S3Service.baseUrl + '/character/' + character;
		this.gachaCard = this.baseUrl + '/gacha_card.webp';
		this.gachaSplash = this.baseUrl + '/gacha_splash.webp';
		this.icon = this.baseUrl + '/icon.webp';
	}
}

class S3WeaponBucket {
	private readonly baseUrl: string;

	public icon;

	public constructor(weapon: WeaponKey) {
		this.baseUrl = S3Service.baseUrl + '/weapons/' + weapon;
		this.icon = this.baseUrl + '/icon.webp';
	}
}

class S3ArtifactBucket {
	private readonly baseUrl: string;

	public circlet;
	public flower;
	public goblet;
	public plume;
	public sands;

	public constructor(artifact: ArtifactSetKey) {
		this.baseUrl = S3Service.baseUrl + '/artifacts/' + artifact;

		this.circlet = this.baseUrl + '/circlet.webp';
		this.flower = this.baseUrl + '/flower.webp';
		this.goblet = this.baseUrl + '/goblet.webp';
		this.plume = this.baseUrl + '/plume.webp';
		this.sands = this.baseUrl + '/sands.webp';
	}
}

class S3AchievementBucket {
	private readonly baseUrl: string;

	public icon;

	public constructor(achievementCategory: string) {
		this.baseUrl = S3Service.baseUrl + '/achievements/categories/' + achievementCategory;
		this.icon = this.baseUrl + '.webp';
	}
}
