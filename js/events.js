import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { Calendar } from 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/5.10.0/main.min.js';

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    navLinks: true,
    selectable: true,
    editable: true,
    events: async (info, successCallback, failureCallback) => {
      try {
        const querySnapshot = await db.collection('hrEvents').get();
        const events = [];
        querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          events.push({
            id: doc.id,
            title: eventData.event,
            start: eventData.date.toDate(), // Convert Firestore Timestamp to Date
          });
        });
        successCallback(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        failureCallback(error);
      }
    },
    dateClick: function (info) {
      const eventText = prompt('Enter event description:');
      if (eventText) {
        saveEventToFirebase(info.date, eventText);
      }
    },
    eventClick: function (info) {
      const confirmed = confirm(
        `Are you sure you want to delete the event "${info.event.title}"?`
      );
      if (confirmed) {
        deleteEventFromFirebase(info.event.id);
      }
    },
  });

  calendar.render();

  async function saveEventToFirebase(date, eventText) {
    try {
      const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      await db.collection('hrEvents').add({
        date: firebase.firestore.Timestamp.fromDate(date),
        event: eventText,
      });
      console.log('Event saved successfully!');
      calendar.refetchEvents(); // Reload events after saving
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  async function deleteEventFromFirebase(eventId) {
    try {
      await db.collection('hrEvents').doc(eventId).delete();
      console.log('Event deleted successfully!');
      calendar.refetchEvents(); // Reload events after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }
});
