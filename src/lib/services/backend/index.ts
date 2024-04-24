import EnvironmentService from '$lib/services/environment';
import { BackendDataService } from '$lib/services/backend/data';
import { BackendAuthService } from '$lib/services/backend/auth';
import { BackendHoyoService } from '$lib/services/backend/hoyo';

export default class BackendService {
	private env: EnvironmentService = EnvironmentService.getInstance();

	public data = new BackendDataService(this.env.variables.backendUrl);
	public auth = new BackendAuthService(this.env.variables.backendUrl);
	public hoyo = new BackendHoyoService(this.env.variables.backendUrl);
}
