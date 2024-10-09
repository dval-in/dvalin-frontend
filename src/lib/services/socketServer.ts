// socketServer.ts
import { io, Socket } from 'socket.io-client';
import { get } from 'svelte/store';
import { toast } from 'svelte-sonner';
import { applicationState } from '$lib/store/application_state';
import type { QueryClient } from '@tanstack/svelte-query';
import i18n from '$lib/services/i18n';
import { writable } from 'svelte/store';

export const socketStore = writable<Socket | null>(null);

export class SocketServer {
	private socket: Socket;
	private queryClient: QueryClient;

	constructor(backendUrl: string, queryClient: QueryClient) {
		this.socket = io(backendUrl, { withCredentials: true });
		this.queryClient = queryClient;
		this.setupEventListeners();
		socketStore.set(this.socket);
	}

	private setupEventListeners() {
		this.socket.on('authenticationState', this.handleAuthenticationState);
		this.socket.on('invalidateQuery', this.handleInvalidateQuery);
		this.socket.on('toast', this.handleToast);
	}

	private handleAuthenticationState = (authenticationState: boolean) => {
		applicationState.update((state) => ({
			...state,
			isAuthenticated: authenticationState
		}));
	};

	private handleInvalidateQuery = (queryKey: string[]) => {
		this.queryClient.invalidateQueries({ queryKey });
	};

	private handleToast = (toastMessage: {
		type: 'success' | 'error' | 'info' | 'loading';
		message: string;
	}) => {
		const message = get(i18n).t(toastMessage.message);

		switch (toastMessage.type) {
			case 'success':
				return toast.success(message);
			case 'error':
				return toast.error(message);
			case 'info':
				return toast.info(message);
			case 'loading':
				return toast.loading(message);
		}
	};

	public getSocket() {
		return this.socket;
	}
}

export const createSocketServer = (backendUrl: string, queryClient: QueryClient) => {
	return new SocketServer(backendUrl, queryClient);
};
