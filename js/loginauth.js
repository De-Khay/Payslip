import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('username').value; // Assuming 'username' input holds the email
  const password = document.getElementById('password').value;

  try {
    // Query Firestore to find a matching user
    const usersRef = collection(db, 'Authentication');
    const q = query(usersRef, where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // User not found or invalid credentials
      throw new Error('Invalid email or password');
    } else {
      // Authentication successful, proceed to redirect based on department
      const userDoc = querySnapshot.docs[0]; // Assuming only one user matches the credentials
      const department = userDoc.get('department');

      if (department === 'hr') {
        window.location.href = 'home.html';
      } else if (department === 'store') {
        window.location.href = 'materials_dashboard.html';
      }
    }
  } catch (error) {
    console.error('Login Error:', error.message);
    alert('Invalid email or password. Please try again.');
  }
});