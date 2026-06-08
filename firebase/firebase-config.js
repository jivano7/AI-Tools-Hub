
  // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
        // TODO: Add SDKs for Firebase products that you want to use
          // https://firebase.google.com/docs/web/setup#available-libraries

            // Your web app's Firebase configuration
              // For Firebase JS SDK v7.20.0 and later, measurementId is optional
                const firebaseConfig = {
                    apiKey: "AIzaSyDhwooW5LUW-xVM_4SzbI6hmiPZz2PbCYU",
                        authDomain: "ai-tools-hub-28a98.firebaseapp.com",
                            projectId: "ai-tools-hub-28a98",
                                storageBucket: "ai-tools-hub-28a98.firebasestorage.app",
                                    messagingSenderId: "315107834555",
                                        appId: "1:315107834555:web:b189c27f78d6f16bf2c79e",
                                            measurementId: "G-X9BFS1PD2C"
                                              };

                                                // Initialize Firebase
                                                  const app = initializeApp(firebaseConfig);
                                                    const analytics = getAnalytics(app);
                                                    