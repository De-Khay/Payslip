// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I",
    authDomain: "inventory-tracker-251d9.firebaseapp.com",
    projectId: "inventory-tracker-251d9",
    storageBucket: "inventory-tracker-251d9.appspot.com",
    messagingSenderId: "687688694025",
    appId: "1:687688694025:web:8687bfa31dc57a5177bbd8",
    measurementId: "G-XLKM7VBSSD"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function populatePage() {
    const staffId = document.getElementById('staffId').value;
    try {
        const docRef = await db.collection('payslip').doc(staffId).get();
        if (docRef.exists) {
            const data = docRef.data();
            // Populate the page with the retrieved data
            const formDataDiv = document.getElementById('formData');
            formDataDiv.innerHTML = ''; // Clear previous data
            Object.keys(data).forEach(key => {
                const p = document.createElement('p');
                p.textContent = `${key}: ${data[key]}`;
                formDataDiv.appendChild(p);
            });
            document.getElementById('errorMessage').innerText = ''; // Clear error message if any
        } else {
            document.getElementById('errorMessage').innerText = 'No document found with that Staff ID.';
        }
    } catch (error) {
        console.error('Error retrieving document:', error);
        document.getElementById('errorMessage').innerText = 'Error retrieving document. Please try again later.';
    }
}
