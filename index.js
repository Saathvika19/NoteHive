import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCjqXLRESJLxKzGacwyQkCrjhsdBwTolNk",
    authDomain: "notes-90730.firebaseapp.com",
    projectId: "notes-90730",
    storageBucket: "notes-90730.appspot.com",
    messagingSenderId: "923928824043",
    appId: "1:923928824043:web:63047c7db6baa8d70a96ae",
    measurementId: "G-XBYXS784TZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const loginToggle = document.getElementById('loginToggle');
const signupToggle = document.getElementById('signupToggle');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');


loginToggle.addEventListener('click', () => {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
});
  
signupToggle.addEventListener('click', () => {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');
});

function displayError(message) {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.innerText = message;
  document.body.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
}

signupBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = 'home.html';
    })
    .catch((error) => {
        displayError(error.message);
    });
});

loginBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = 'home.html';
    })
    .catch((error) => {
      displayError(error.message);
    });
});


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      window.location.href = 'home.html';
    }
});






