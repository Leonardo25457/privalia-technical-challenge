const firebaseConfig = {
  apiKey: "AIzaSyCebn3Xov-W6tc_CBygohq1uE_3Xmb6M3E",
  authDomain: "privalia-technical-challenge.firebaseapp.com",
  projectId: "privalia-technical-challenge",
  storageBucket: "privalia-technical-challenge.firebasestorage.app",
  messagingSenderId: "265300345885",
  appId: "1:265300345885:web:bda9ba46e21c2cd054b2f4",
};
if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
