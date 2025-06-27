const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phoneCode = document.getElementById("phoneCode").value;
  const phone = document.getElementById("phone").value.trim();
  const country = document.getElementById("country").value;
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const age = document.getElementById("age").value.trim();
  const password = document.getElementById("password").value;

  const fullPhone = phoneCode + phone;

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

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find(u => u.email === email || u.name === name);
  if (exists) {
    errorMsg.textContent = "هذا الاسم أو البريد مستخدم بالفعل.";
    return;
  }

 const newUser = {
  name,
  phone: fullPhone,
  country,
  address,
  email,
  age,
  password,
  plan: "free", 
  members: []
};


  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "login.html";
});
