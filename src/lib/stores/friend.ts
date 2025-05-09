import { writable } from 'svelte/store';

export interface Contact {
	type?: string;
	info?: string;
	qr?: string;
}

export interface FriendData {
	name: string;
	contact: Contact;
	quote: string;
	img: string;
}

export const friend = writable<FriendData>({
	name: '',
	contact: {
		type: 'fb',
		info: ''
	},
	quote: '',
	img: ''
});
