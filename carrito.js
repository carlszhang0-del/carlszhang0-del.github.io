// Obtener usuario activo
let usuarioActivo = localStorage.getItem("usuarioActivo");
if (!usuarioActivo) {
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
}

// Cargar carritos
let carritos = JSON.parse(localStorage.getItem("carritos")) || {};

// Si el usuario no tiene carrito, crear uno
if (!carritos[usuarioActivo]) {
    carritos[usuarioActivo] = [];
}

// Mostrar carrito
function mostrarCarrito() {
    let lista = document.getElementById("listaCarrito");
    let total = 0;

    lista.innerHTML = "";

    carritos[usuarioActivo].forEach((item, index) => {
        total += item.precio;

        lista.innerHTML += `
            <div>
                <span>${item.nombre} - $${item.precio}</span>
                <button onclick="eliminar(${index})">X</button>
            </div>
        `;
    });

    document.getElementById("total").textContent = total.toFixed(2);
}

mostrarCarrito();

// Eliminar producto
function eliminar(index) {
    carritos[usuarioActivo].splice(index, 1);
    localStorage.setItem("carritos", JSON.stringify(carritos));
    mostrarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    carritos[usuarioActivo] = [];
    localStorage.setItem("carritos", JSON.stringify(carritos));
    mostrarCarrito();
}

// Comprar
function comprar() {
    if (carritos[usuarioActivo].length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    // Obtener pedidos existentes
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || {};

    // Si el usuario no tiene pedidos, crear lista
    if (!pedidos[usuarioActivo]) {
        pedidos[usuarioActivo] = [];
    }

    // Crear pedido nuevo
    let nuevoPedido = {
        fecha: new Date().toLocaleString(),
        productos: carritos[usuarioActivo],
        total: carritos[usuarioActivo].reduce((sum, item) => sum + item.precio, 0)
    };

    // Guardar pedido
    pedidos[usuarioActivo].push(nuevoPedido);

    // Guardar en localStorage
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // Vaciar carrito
    carritos[usuarioActivo] = [];
    localStorage.setItem("carritos", JSON.stringify(carritos));

    alert("Compra realizada con éxito");
    mostrarCarrito();
}
