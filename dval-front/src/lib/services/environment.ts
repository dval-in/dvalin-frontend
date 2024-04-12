interface EnvVars {
	readonly backendUrl: string;
}

export default class EnvironmentService {
	private static instance: EnvironmentService;
	public readonly variables: EnvVars;

	private constructor() {
		this.variables = {
			backendUrl: import.meta.env.BACKEND_URL
		};
	}

	public static getInstance(): EnvironmentService {
		if (!EnvironmentService.instance) {
			EnvironmentService.instance = new EnvironmentService();
		}

		return EnvironmentService.instance;
	}
}
