import { auth, db, googleProvider } from '../firebase/firebase-config.js';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc, setDoc, getDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== PAGE PROTECTION =====
const currentPage = window.location.pathname;
const publicPages = ['login.html', 'signup.html', 'about.html', 'contact.html'];
const isPublicPage = publicPages.some(p => currentPage.includes(p));

// ===== MERGED AUTH STATE LISTENER =====
// FIX: Duplicate onAuthStateChanged merged into one
onAuthStateChanged(auth, (user) => {
  // Page protection
  if (!user && !isPublicPage) {
    window.location.href = 'login.html';
  }

  // UI update
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

// ===== SHOW MESSAGE =====
function showMessage(msg, type = 'error') {
  const el = document.getElementById('authMessage');
  if (!el) return;
  el.textContent = msg;
  el.className = `auth-message ${type}`;
}

// ===== GOOGLE LOGIN =====
window.loginWithGoogle = async function () {
  try {

    googleProvider.setCustomParameters({
      prompt: "select_account"
    });

    const result = await signInWithPopup(auth, googleProvider);

    await saveUserToFirestore(result.user);

    showMessage('Login successful!', 'success');

    setTimeout(() => window.location.href = 'index.html', 1500);

  } catch (error) {
    console.error('Google login error:', error);
    showMessage('Google login failed. Please try again.', 'error');
  }
};

// ===== EMAIL LOGIN =====
window.loginWithEmail = async function () {
const email = document.getElementById('loginEmail').value.trim();
const password = document.getElementById('loginPassword').value;

if (!email || !password) {
showMessage('Enter both email and password');
return;
}

try {
await signInWithEmailAndPassword(auth, email, password);
showMessage('Login successful!', 'success');
setTimeout(() => window.location.href = 'index.html', 1500);
} catch (error) {
if (error.code === 'auth/user-not-found') {
showMessage('This email is not registered');
} else if (error.code === 'auth/wrong-password') {
showMessage('wrong Password');
} else {
showMessage('Login fail: ' + error.message);
}
}
};


// ===== SIGNUP =====
window.signupWithEmail = async function () {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!name || !email || !password) {
    showMessage('Please fill all fields');
    return;
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    await saveUserToFirestore(result.user, name);
    showMessage('Account created successfully!', 'success');
    setTimeout(() => window.location.href = 'index.html', 1500);
  } catch (error) {
    console.error('Signup error:', error);
    // FIX: No error.message exposed to user
    if (error.code === 'auth/email-already-in-use') {
      showMessage('This email is already registered.');
    } else if (error.code === 'auth/weak-password') {
      showMessage('Password must be at least 6 characters.');
    } else {
      showMessage('Signup failed. Please try again.');
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
      // FIX: Stronger name fallback with trim check
      name: (name && name.trim()) || user.displayName || 'User',
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

// ===== LOGOUT =====
window.logoutUser = async function () {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error(error);
  }
};

window.resetPassword = async function () {

  const email = document.getElementById("loginEmail").value.trim();

  if (!email) {
    showMessage("Please enter your email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    showMessage("Password reset email sent. Check your inbox.", "success");
  } catch (error) {
    console.error(error);

    if (error.code === "auth/user-not-found") {
      showMessage("No account found with this email.");
    } else if (error.code === "auth/invalid-email") {
      showMessage("Invalid email address.");
    } else {
      showMessage("Unable to send password reset email.");
    }
  }
};