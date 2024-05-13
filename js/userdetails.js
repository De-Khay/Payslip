import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I',
  authDomain: 'inventory-tracker-251d9.firebaseapp.com',
  projectId: 'inventory-tracker-251d9',
  storageBucket: 'inventory-tracker-251d9.appspot.com',
  messagingSenderId: '687688694025',
  appId: '1:687688694025:web:8687bfa31dc57a5177bbd8',
  measurementId: 'G-XLKM7VBSSD',
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


// Function to fetch and display user details
export async function displayUserDetails() {
    try {
        const querySnapshot = await getDocs(collection(db, "Authentication"));
        querySnapshot.forEach((doc) => {
            const userDetails = doc.data();

            // Display designation
            const titleElement = document.querySelector('.title');
            if (userDetails.designation) {
                titleElement.textContent = userDetails.designation;
            }

            // Display first name and last name
            const nameElement = document.querySelector('.name');
            const firstName = userDetails.firstName || '';
            const lastName = userDetails.lastName || '';
            nameElement.textContent = `${firstName} ${lastName}`;
        });
    } catch (error) {
        console.error("Error getting user details: ", error);
    }
}