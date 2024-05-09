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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);

// Function to fetch total number of documents in the entire Firestore database
function getTotalDocuments() {
    let totalCount = 0;
    db.collectionGroup('_').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            totalCount++;
        });
        document.getElementById('totalDocuments').textContent = totalCount;
    }).catch(error => {
        console.error("Error getting documents: ", error);
    });
}

// Call the function to fetch total number of documents when the page loads
window.onload = getTotalDocuments;
