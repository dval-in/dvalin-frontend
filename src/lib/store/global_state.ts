import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export const showSidebar = writable(false);
export const showSidebarSections = persisted('showSidebarSections', [true, true, true]);
