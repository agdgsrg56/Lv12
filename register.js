// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDIHlQs6gw--sTbzhTXw7mF1by8yOTdNXo", // ← ضع مفتاحك هنا من Firebase
  authDomain: "lv-12-dd2da.firebaseapp.com",
  projectId: "lv-12-dd2da",
  storageBucket: "lv-12-dd2da.appspot.com",
  messagingSenderId: "********",
  appId: "***************"
};

// Firebase init
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const phoneCode = document.getElementById("phoneCode").value;
  const phone = document.getElementById("phone").value.trim();
  const country = document.getElementById("country").value;
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const age = document.getElementById("age").value.trim();
  const password = document.getElementById("password").value;

  const fullPhone = phoneCode + phone;

  // Basic Validation
  if (!name || !phone || !phoneCode || !country || !address || !email || !age || !password) {
    errorMsg.textContent = "كل الحقول مطلوبة!";
    return;
  }

  if (!email.endsWith("@gmail.com")) {
    errorMsg.textContent = "يجب استخدام بريد Gmail فقط.";
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
    return;
  }

  const phoneRegex = /^[0-9]{6,15}$/;
  if (!phoneRegex.test(phone)) {
    errorMsg.textContent = "رقم الهاتف غير صحيح.";
    return;
  }

  try {
    // إنشاء حساب المستخدم في Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // حفظ بيانات إضافية في Firestore
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      name,
      phone: fullPhone,
      country,
      address,
      email,
      age,
      plan: "free",
      members: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = "login.html";

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      errorMsg.textContent = "البريد مستخدم بالفعل.";
    } else {
      errorMsg.textContent = "حدث خطأ: " + error.message;
    }
  }
});

