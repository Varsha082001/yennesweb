
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTNLQIASYhRWtusN_eujPoA7-PX5AAdHE",
  authDomain: "yennes-836f1.firebaseapp.com",
  projectId: "yennes-836f1",
  storageBucket: "yennes-836f1.firebasestorage.app",
  messagingSenderId: "453985549827",
  appId: "1:453985549827:web:07f0ca1b12dae55fa65836",
  measurementId: "G-ZXVHJB3PFQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
