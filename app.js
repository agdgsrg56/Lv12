const setupUserDiv = document.getElementById("setupUser");
const dashboardDiv = document.getElementById("dashboard");

// تحقق إذا كان فيه مستخدم موجود
if (localStorage.getItem("adminUser")) {
  setupUserDiv.style.display = "none";
  dashboardDiv.style.display = "block";
}

function createAdmin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("من فضلك املأ كل الحقول");
    return;
  }

  const adminUser = {
    username,
    password
  };

  // نحفظه في المتصفح
  localStorage.setItem("adminUser", JSON.stringify(adminUser));

  alert("تم إنشاء المستخدم بنجاح!");
  setupUserDiv.style.display = "none";
  dashboardDiv.style.display = "block";
}
