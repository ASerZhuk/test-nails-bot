// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getMessaging, getToken } from 'firebase/messaging' // Импортируйте функцию getMessaging

const firebaseConfig = {
	apiKey: 'AIzaSyAMnO6pOCD5olGIxzewz8INhROi3uLDg2Q',
	authDomain: 'estmestechko.firebaseapp.com',
	projectId: 'estmestechko',
	storageBucket: 'estmestechko.appspot.com',
	messagingSenderId: '376953256286',
	appId: '1:376953256286:web:00246e4d5ced3a1c4bb7cf',
}

const app = initializeApp(firebaseConfig)

const storage = getStorage()

export { storage }
