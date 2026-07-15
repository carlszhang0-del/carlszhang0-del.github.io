// Cargar usuario activo
let usuarioActivo = localStorage.getItem("usuarioActivo");
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

if (!usuarioActivo) {
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
}

// Buscar datos del usuario
let user = usuarios.find(u => u.email === usuarioActivo);

// Mostrar datos
document.getElementById("correoUsuario").textContent = user.email;
document.getElementById("direccionUsuario").textContent = user.direccion || "No registrada";
document.getElementById("fotoPerfil").src = user.foto || "img/default.png";

// Función para editar datos
function editar() {
    let nuevaDireccion = prompt("Ingresa tu dirección:", user.direccion || "");
    let nuevaFoto = prompt("Ingresa URL de tu foto (opcional):", user.foto || "");

    user.direccion = nuevaDireccion;
    user.foto = nuevaFoto;

    // Guardar cambios
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Datos actualizados");
    location.reload();
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada");
    window.location.href = "login.html";
}
