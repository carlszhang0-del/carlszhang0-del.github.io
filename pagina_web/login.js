function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // BUSCAR USUARIO
    let user = usuarios.find(u => u.email === email && u.pass === pass);

    if (user) {
        localStorage.setItem("usuarioActivo", email);
        alert("Inicio de sesión exitoso");
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
}
