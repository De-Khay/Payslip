import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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

// Function to fetch and display total number of employees
async function getTotalEmployees() {
    try {
        const querySnapshot = await getDocs(collection(db, "payslip"));
        const totalEmployees = querySnapshot.size;
        document.getElementById('totalEmployees').textContent = totalEmployees;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

// Function to fetch and display total number of female staff
async function getTotalFemaleStaff() {
    try {
        const querySnapshot = await getDocs(collection(db, "payslip"));
        let femaleCount = 0;
        querySnapshot.forEach((doc) => {
            if (doc.data().gender === "female") {
                femaleCount++;
            }
        });
        document.getElementById('totalFemale').textContent = femaleCount;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

// Function to fetch and display total number of male staff
async function getTotalMaleStaff() {
    try {
        const querySnapshot = await getDocs(collection(db, "payslip"));
        let maleCount = 0;
        querySnapshot.forEach((doc) => {
            if (doc.data().gender === "male") {
                maleCount++;
            }
        });
        document.getElementById('totalMale').textContent = maleCount;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

// Function to fetch and display total number of IT staff
async function getTotalITStaff() {
    try {
        const querySnapshot = await getDocs(collection(db, "payslip"));
        let ITCount = 0;
        querySnapshot.forEach((doc) => {
            if (doc.data().department === "IT") {
                ITCount++;
            }
        });
        document.getElementById('totalIT').textContent = ITCount;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

// Call the functions to fetch and display total number of employees, female, male, and IT staff when the page loads
window.onload = function() {
    getTotalEmployees();
    getTotalFemaleStaff();
    getTotalMaleStaff();
    getTotalITStaff();
};