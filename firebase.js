// Import the necessary Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I",
authDomain: "inventory-tracker-251d9.firebaseapp.com",
projectId: "inventory-tracker-251d9",
storageBucket: "inventory-tracker-251d9.appspot.com",
messagingSenderId: "687688694025",
appId: "1:687688694025:web:3212fc7a4ec0f6af77bbd8",
measurementId: "G-9DGC2CVT6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//get ref to database services
const database = getDatabase("app");

export { database, ref, set };

