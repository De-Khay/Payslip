// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I",
    authDomain: "inventory-tracker-251d9.firebaseapp.com",
    projectId: "inventory-tracker-251d9",
    storageBucket: "inventory-tracker-251d9.appspot.com",
    messagingSenderId: "687688694025",
    appId: "1:687688694025:web:8687bfa31dc57a5177bbd8",
    measurementId: "G-XLKM7VBSSD"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
// Function to add a new material entry
function addMaterial(materialData) {
  db.collection('materials').add(materialData)
    .then(docRef => {
      window.alert('Material added successfully with ID: ' + docRef.id);
      console.log('Material added successfully with ID: ', docRef.id);
    })
    .catch(error => {
      console.error('Error adding material:', error);
    });
}

// Event listener for adding a material
document.getElementById('submit').addEventListener('click', function () {
const materialName = document.getElementById('materialName').value.trim();
const quantity = document.getElementById('quantity').value.trim();
const note = document.getElementById('note').value.trim();
const entryName = document.getElementById('entryName').value.trim();
const entryDate = document.getElementById('entryDate').value.trim();
if (materialName && quantity && entryName && entryDate) {
  addMaterial({ name: materialName, quantity, note, entryName, entryDate });
} else {
  console.error('Please fill in all required fields');
}
});

// Function to search for materials
function searchMaterials(searchText) {
db.collection('materials').where('name', '>=', searchText)
  .get()
  .then(querySnapshot => {
    const materials = [];
    querySnapshot.forEach(doc => {
      materials.push(doc.data());
    });
    displayMaterials(materials);
  })
  .catch(error => {
    console.error('Error searching for materials:', error);
  });
}

// Function to display materials in a table
function displayMaterials(materials) {
const materialTable = document.getElementById('materialTable');
materialTable.innerHTML = ''; // Clear previous data
if (materials.length === 0) {
  materialTable.innerHTML = '<p>No materials found</p>';
  return;
}
let tableHTML = '<table>';
tableHTML += '<tr><th>Name</th><th>Quantity</th><th>Note</th><th>Name of Entry</th><th>Date of Entry</th></tr>';
materials.forEach(material => {
  tableHTML += `<tr><td>${material.name}</td><td>${material.quantity}</td><td>${material.note}</td><td>${material.entryName}</td><td>${material.entryDate}</td></tr>`;
});
tableHTML += '</table>';
materialTable.innerHTML = tableHTML;
}

// Event listener for searching materials
document.getElementById('searchButton').addEventListener('click', function () {
const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
if (searchText) {
  searchMaterials(searchText);
} else {
  console.error('Please enter a search query');
}
});
