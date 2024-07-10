import type { IImporterService } from '$lib/services/importer/index';
import { isDvalinUserProfile, type UserProfile } from '$lib/types/user_profile';

export class DvalinImporterService implements IImporterService {
	import(data: unknown): UserProfile {
		if (isDvalinUserProfile(data)) {
			return {
				...data
			};
		}
		throw new Error('Make sure you upload the right file format');
	}
}
