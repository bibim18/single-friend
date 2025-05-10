import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCl-vraUsG_S5ywutJpc6VxJgEdw2jWLEs',
	authDomain: 'bidodos-43e72.firebaseapp.com',
	databaseURL: 'https://bidodos-43e72.firebaseio.com',
	projectId: 'bidodos-43e72',
	storageBucket: 'bidodos-43e72.appspot.com',
	messagingSenderId: '949393359805',
	appId: '1:949393359805:web:3c1963c34af53cf6'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Export the services
export {
	auth,
	firestore,
	storage,
	addDoc,
	collection,
	getDocs,
	deleteDoc,
	doc,
	ref,
	uploadBytes,
	getDownloadURL
};
