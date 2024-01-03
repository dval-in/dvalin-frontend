import { writable } from 'svelte/store';

export const showSidebar = writable(false);
export const showSidebarSections = writable([true, true, true]);
