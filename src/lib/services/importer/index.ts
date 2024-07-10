import { PaimonMoeImporterService } from '$lib/services/importer/paimon';
import { DvalinImporterService } from '$lib/services/importer/dvalin';
import type { UserProfile } from '$lib/types/user_profile';

const importerServices: { [key: string]: IImporterService } = {
	dvalin: new DvalinImporterService(),
	paimon: new PaimonMoeImporterService()
};

export type ImporterServices = keyof typeof importerServices;

export interface IImporterService {
	import(data: unknown): UserProfile;
}

export default class ImporterService {
	getImporterService(key: ImporterServices) {
		return importerServices[key];
	}
}
