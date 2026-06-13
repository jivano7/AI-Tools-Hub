 import { auth, db, googleProvider } from '../firebase/firebase-config.js';

 import {
   signInWithPopup,
     signInWithEmailAndPassword,
       createUserWithEmailAndPassword,
         updateProfile,
           onAuthStateChanged,
             signOut
             } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

             import {
               doc, setDoc, getDoc, serverTimestamp
               } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

               function showMessage(msg, type = 'error') {
                 const el = document.getElementById('authMessage');
                   if (!el) return;
                     el.textContent = msg;
                       el.className = `auth-message ${type}`;
                       }

                       // ===== GOOGLE LOGIN =====
                       window.loginWithGoogle = async function () {
                         try {
                             const result = await signInWithPopup(auth, googleProvider);
                                 await saveUserToFirestore(result.user);
                                     showMessage('Login successful! Redirect ho rahe hain...', 'success');
                                         setTimeout(() => window.location.href = 'index.html', 1500);
                                           } catch (error) {
                                               showMessage('Google login fail hua: ' + error.message);
                                                 }
                                                 };

                                                 // ===== EMAIL LOGIN =====
                                                 window.loginWithEmail = async function () {
                                                   const email = document.getElementById('loginEmail').value.trim();
                                                     const password = document.getElementById('loginPassword').value;

                                                       if (!email || !password) {
                                                           showMessage('Email aur password dono bharo');
                                                               return;
                                                                 }

                                                                   try {
                                                                       await signInWithEmailAndPassword(auth, email, password);
                                                                           showMessage('Login ho gaya!', 'success');
                                                                               setTimeout(() => window.location.href = 'index.html', 1500);
                                                                                 } catch (error) {
                                                                                     if (error.code === 'auth/user-not-found') {
                                                                                           showMessage('Yeh email registered nahi hai');
                                                                                               } else if (error.code === 'auth/wrong-password') {
                                                                                                     showMessage('Password galat hai');
                                                                                                         } else {
                                                                                                               showMessage('Login fail: ' + error.message);
                                                                                                                   }
                                                                                                                     }
                                                                                                                     };

                                                                                                                     // ===== SIGNUP =====
                                                                                                                     window.signupWithEmail = async function () {
                                                                                                                       const name = document.getElementById('signupName').value.trim();
                                                                                                                         const email = document.getElementById('signupEmail').value.trim();
                                                                                                                           const password = document.getElementById('signupPassword').value;

                                                                                                                             if (!name || !email || !password) {
                                                                                                                                 showMessage('Sabhi fields bharo');
                                                                                                                                     return;
                                                                                                                                       }

                                                                                                                                         try {
                                                                                                                                             const result = await createUserWithEmailAndPassword(auth, email, password);
                                                                                                                                                 await updateProfile(result.user, { displayName: name });
                                                                                                                                                     await saveUserToFirestore(result.user, name);
                                                                                                                                                         showMessage('Account ban gaya!', 'success');
                                                                                                                                                             setTimeout(() => window.location.href = 'index.html', 1500);
                                                                                                                                                               } catch (error) {
                                                                                                                                                                   if (error.code === 'auth/email-already-in-use') {
                                                                                                                                                                         showMessage('Yeh email pehle se registered hai');
                                                                                                                                                                             } else {
                                                                                                                                                                                   showMessage('Signup fail: ' + error.message);
                                                                                                                                                                                       }
                                                                                                                                                                                         }
                                                                                                                                                                                         };

                                                                                                                                                                                         // ===== SAVE USER TO FIRESTORE =====
                                                                                                                                                                                         async function saveUserToFirestore(user, name = null) {
                                                                                                                                                                                           const userRef = doc(db, 'users', user.uid);
                                                                                                                                                                                             const snap = await getDoc(userRef);
                                                                                                                                                                                               if (!snap.exists()) {
                                                                                                                                                                                                   await setDoc(userRef, {
                                                                                                                                                                                                         uid: user.uid,
                                                                                                                                                                                                               name: name || user.displayName || 'User',
                                                                                                                                                                                                                     email: user.email,
                                                                                                                                                                                                                           photoURL: user.photoURL || '',
                                                                                                                                                                                                                                 favorites: [],
                                                                                                                                                                                                                                       joinedAt: serverTimestamp()
                                                                                                                                                                                                                                           });
                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                             }

                                                                                                                                                                                                                                             // ===== TOGGLE PASSWORD =====
                                                                                                                                                                                                                                             window.togglePassword = function (inputId) {
                                                                                                                                                                                                                                               const input = document.getElementById(inputId);
                                                                                                                                                                                                                                                 input.type = input.type === 'password' ? 'text' : 'password';
                                                                                                                                                                                                                                                 };

                                                                                                                                                                                                                                                 // ===== AUTH STATE CHECK =====
                                                                                                                                                                                                                                                 onAuthStateChanged(auth, (user) => {
                                                                                                                                                                                                                                                   if (user) {
                                                                                                                                                                                                                                                       const page = window.location.pathname;
                                                                                                                                                                                                                                                           if (page.includes('login') || page.includes('signup')) {
                                                                                                                                                                                                                                                                 window.location.href = 'index.html';
                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                       });

                                                                                                                                                                                                                                                                       // ===== LOGOUT =====
                                                                                                                                                                                                                                                                       window.logoutUser = async function () {
                                                                                                                                                                                                                                                                         await signOut(auth);
                                                                                                                                                                                                                                                                           window.location.href = 'login.html';
                                                                                                                                                                                                                                                                           };
// ===== UI AUTH STATE =====
onAuthStateChanged(auth, (user) => {
  const logoutBtn = document.getElementById('logoutBtn');
  const loginBtn = document.getElementById('loginBtn');
  if (user) {
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (loginBtn) loginBtn.style.display = 'none';
  } else {
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'block';
  }
});
