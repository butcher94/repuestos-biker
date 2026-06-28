// ===== LOGIN USUARIO =====
const userForm = document.getElementById("userForm");

if (userForm) {
  userForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", email);

    document.getElementById("mensajeUser").textContent =
      "¡Bienvenido " + nombre + "!";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
}

// ===== LOGIN ADMIN =====
const adminForm = document.getElementById("adminForm");

if (adminForm) {
  adminForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("adminNombre").value;
    const pass = document.getElementById("adminPass").value;

    if (nombre === "admin" && pass === "1234") {
      document.getElementById("mensajeAdmin").textContent = "Acceso correcto";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      document.getElementById("mensajeAdmin").textContent = "Datos incorrectos";
    }
  });
}

// ===== SALUDO EN INDEX =====
const saludo = document.getElementById("saludo");

if (saludo) {
  const nombreGuardado = localStorage.getItem("nombre");

  if (nombreGuardado) {
    saludo.textContent = "Hola, " + nombreGuardado;
  }
}