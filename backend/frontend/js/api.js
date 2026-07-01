// =======================================
// API DE REPUESTOS BIKER
// =======================================

// En Railway las peticiones se hacen al mismo dominio.
// Si trabajas localmente usará localhost.

const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "";


// =======================================
// FUNCIÓN AUXILIAR
// =======================================

async function peticion(url, opciones = {}) {

    try {

        const respuesta = await fetch(API_URL + url, opciones);

        if (!respuesta.ok) {

            throw new Error(`Error ${respuesta.status}`);

        }

        return await respuesta.json();

    }

    catch (error) {

        console.error("Error de conexión:", error);

        throw error;

    }

}


// =======================================
// PRODUCTOS
// =======================================

async function obtenerProductos() {

    return await peticion("/productos");

}

async function guardarProductoBD(nombre, precio, imagen) {

    return await peticion("/productos", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            nombre,
            precio,
            imagen

        })

    });

}

async function actualizarProducto(id, nombre, precio, imagen) {

    return await peticion("/productos/" + id, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            nombre,
            precio,
            imagen

        })

    });

}

async function eliminarProductoBD(id) {

    return await peticion("/productos/" + id, {

        method: "DELETE"

    });

}


// =======================================
// CARRITO
// =======================================

async function obtenerCarrito() {

    return await peticion("/carrito");

}

async function agregarAlCarrito(id) {

    return await peticion("/carrito", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            producto_id: id

        })

    });

}

async function eliminarDelCarrito(id) {

    return await peticion("/carrito/" + id, {

        method: "DELETE"

    });

}

async function sumarCantidad(id) {

    return await peticion("/carrito/sumar/" + id, {

        method: "PUT"

    });

}

async function restarCantidad(id) {

    return await peticion("/carrito/restar/" + id, {

        method: "PUT"

    });

}


// =======================================
// VENTAS
// =======================================

async function obtenerVentas() {

    return await peticion("/ventas");

}

async function comprarProductos() {

    return await peticion("/comprar", {

        method: "POST"

    });

}


// =======================================
// USUARIOS
// =======================================

async function obtenerUsuarios() {

    return await peticion("/usuarios");

}

async function registrarUsuario(nombre, email, password) {

    return await peticion("/usuarios", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            nombre,
            email,
            password

        })

    });

}

async function actualizarUsuario(id, nombre, email, password) {

    return await peticion("/usuarios/" + id, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            nombre,
            email,
            password

        })

    });

}

async function eliminarUsuarioBD(id) {

    return await peticion("/usuarios/" + id, {

        method: "DELETE"

    });

}


// =======================================
// LOGIN
// =======================================

async function loginUsuario(email, password) {

    return await peticion("/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email,
            password

        })

    });

}