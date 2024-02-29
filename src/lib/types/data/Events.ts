/** @TJS-required */
export enum Game {
	HonkaiImpact3Rd = 'HonkaiImpact3Rd',
	GenshinImpact = 'GenshinImpact',
	TearsOfThemis = 'TearsOfThemis',
	Hoyolab = 'Hoyolab',
	HonkaiStarRail = 'HonkaiStarRail',
	ZenlessZoneZero = 'ZenlessZoneZero'
}

/** @TJS-required */
export enum MessageType {
	Notices = 'Notices',
	Event = 'Event',
	Info = 'Info'
}

/** @TJS-required */
export enum Tag {
	NewCharacterIntro = 'NewCharacterIntro',
	VoiceArtistAnnouncement = 'VoiceArtistAnnouncement',
	VersionEventWishesNotice = 'VersionEventWishesNotice',
	VersionEventNoticesCompilation = 'VersionEventNoticesCompilation',
	CharacterDemo = 'CharacterDemo',
	CharacterTeaser = 'CharacterTeaser',
	StoryQuest = 'StoryQuest',
	VersionNewWeapon = 'VersionNewWeapon',
	NewOutfit = 'NewOutfit',
	OutfitTeaser = 'OutfitTeaser',
	NewContentsDisplay = 'NewContentsDisplay',
	WebEventWallpapers = 'WebEventWallpapers',
	VersionPreview = 'VersionPreview',
	Event = 'Event',
	VersionTrailer = 'VersionTrailer',
	OstAlbum = 'OstAlbum',
	SpecialProgramPreview = 'SpecialProgramPreview',
	DevelopersDiscussion = 'DevelopersDiscussion',
	CollectedMiscellany = 'CollectedMiscellany',
	VersionEventsPreview = 'VersionEventsPreview',
	EventTeaser = 'EventTeaser',
	VersionNewArtifact = 'VersionNewArtifact',
	UpdatePreview = 'UpdatePreview',
	UpdateDetails = 'UpdateDetails',
	LeyLineOverflow = 'LeyLineOverflow',
	Wallpapers = 'Wallpapers',
	GeniusInvokationTcg = 'GeniusInvokationTcg',
	CutsceneAnimation = 'CutsceneAnimation',
	GenshinConcert2023 = 'GenshinConcert2023',
	VersionPreviewPage = 'VersionPreviewPage',
	Music = 'Music'
}

/** @TJS-required */
export enum LanguageCode {
	Thai = 'th-th',
	ChineseSimplified = 'zh-cn',
	ChineseTraditional = 'zh-tw',
	Russian = 'ru-ru',
	Indonesian = 'id-id',
	Korean = 'ko-kr',
	Vietnamese = 'vi-vn',
	Italian = 'it-it',
	Japanese = 'ja-jp',
	Portuguese = 'pt-pt',
	Turkish = 'tr-tr',
	English = 'en-us',
	German = 'de-de',
	French = 'fr-fr',
	Spanish = 'es-es'
}

type RedirectLinkChain = Array<string>;

/** @TJS-required */
export enum LinkType {
	Image = 'Image',
	HoyoLink = 'HoyoLink',
	Hoyolab = 'Hoyolab',
	MihoyoHoyoverse = 'MihoyoHoyoverse',
	Twitter = 'Twitter',
	Facebook = 'Facebook',
	Youtube = 'Youtube',
	Twitch = 'Twitch',
	Vk = 'Vk',
	Telegram = 'Telegram',
	Relative = 'Relative',
	Unknown = 'Unknown',
	Malformed = 'Malformed'
}

/** @TJS-required */
export type Link = {
	index: number;
	url: string;
	urlOriginal: string;
	urlOriginalResolved: RedirectLinkChain;

	/** @nullable */
	urlS3: string | undefined;
	linkType: LinkType;
	isResolved: boolean;
};

/** @TJS-required */
export type Event = {
	postId: string;
	gameId: Game;
	messageType: MessageType;
	createdAt: Date;
	tags: Array<Tag>;
	language: LanguageCode;
	subject: string;
	content: string;
	contentOriginal: string;
	links: Array<Link>;
	articleUrl: string;
};

export type Events = Array<Event>;
