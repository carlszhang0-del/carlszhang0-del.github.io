let usuarioActivo = localStorage.getItem("usuarioActivo");

if (!usuarioActivo) {
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
}

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || {};

let lista = document.getElementById("listaPedidos");

if (!pedidos[usuarioActivo] || pedidos[usuarioActivo].length === 0) {
    lista.innerHTML = "<p>No tienes pedidos aún.</p>";
} else {
    pedidos[usuarioActivo].forEach((pedido, index) => {
        let productosHTML = pedido.productos
            .map(p => `<li>${p.nombre} - $${p.precio}</li>`)
            .join("");

        lista.innerHTML += `
            <div class="pedido">
                <h3>Pedido #${index + 1}</h3>
                <p><strong>Fecha:</strong> ${pedido.fecha}</p>
                <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
                <p><strong>Productos:</strong></p>
                <ul>${productosHTML}</ul>
            </div>
        `;
    });
}
