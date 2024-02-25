export default class S3Service {
	static baseUrl: string = 'https://s3-api.dval.in';

	static getEventLink(lang: string, year: number, month: number): string {
		return S3Service.baseUrl + '/event/' + lang + '/' + year + '/' + month;
	}

	static getCharacterLink(character: string): string {
		return S3Service.baseUrl + '/character/' + character.toLowerCase().replace(' ', '_');
	}
}
