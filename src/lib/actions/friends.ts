import { firestore, collection, addDoc, getDocs, deleteDoc, doc } from '$lib/firebase';
import type { FriendData } from '$lib/types';

export const addFriendData = async (friend: FriendData) => {
	try {
		const friendsCollection = collection(firestore, 'friends');
		const docRef = await addDoc(friendsCollection, friend);

		console.log('Friend added with ID: ', docRef.id);
		return { success: true, id: docRef.id };
	} catch (error: any) {
		console.error('Error adding friend data: ', error);
		return { success: false, error: error.message };
	}
};

export const getFriends = async (): Promise<FriendData[]> => {
	try {
		const friendsCollection = collection(firestore, 'friends');
		const querySnapshot = await getDocs(friendsCollection);
		const friends: FriendData[] = querySnapshot.docs.map((docSnap) => ({
			...(docSnap.data() as FriendData),
			id: docSnap.id
		}));

		return friends;
	} catch (error) {
		console.error('Error fetching friends data: ', error);
		return [];
	}
};

export async function deleteFriend(id: string) {
	try {
		console.log(id);
		const friendRef = doc(firestore, 'friends', id);
		await deleteDoc(friendRef);
		console.log('Friend deleted:', id);
	} catch (error) {
		console.error('Error deleting friend:', error);
	}
}
