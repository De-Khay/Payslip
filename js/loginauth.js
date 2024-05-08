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
firebase.initializeApp(firebaseConfig);

// Firebase firestore
const db = firebase.firestore();

// Function to handle user registration
function registerUser(_email, _password, _section) {
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const selectedSection = document.getElementById('section').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // User registered successfully
                console.log("User registered:", userCredential.user);
                 // Alert to confirm successful registration
                 window.alert("Registration successful! Your credentials have been stored.");

                // Store user data in Firestore
                db.collection('users').doc(userCredential.user.uid).set({
                    email: email,
                    section: selectedSection // Use the selectedSection value
                })
                .then(() => {
                    console.log("User data stored in Firestore");
                    // Redirect to corresponding section
                    if (selectedSection === 'inventory') {
                        window.location.href = "materials.html";
                    } else if (selectedSection === 'employee') {
                        window.location.href = "home.html";
                    }
                })
                .catch((error) => {
                    console.error("Error storing user data:", error);
                });
            })
            .catch((error) => {
                console.error("Error registering user:", error.message);
                // Handle registration error, e.g., display error message to the user
            });
    });
}