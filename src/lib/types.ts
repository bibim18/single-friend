export interface Contact {
	type?: string;
	info?: string;
	qr?: string;
}

export interface FriendData {
	id?: string;
	name: string;
	contact: Contact;
	quote: string;
	img: string;
}
