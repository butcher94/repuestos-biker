// =====================
// COMPRAR
// =====================

async function comprar(){

    let carrito = await obtenerCarrito();

    if(carrito.length===0){

        alert("El carrito está vacío");

        return;

    }

    await comprarProductos();

    actualizarContador();

    if(typeof mostrarCarrito==="function"){

        mostrarCarrito();

    }

    if(typeof cerrarCarrito==="function"){

        cerrarCarrito();

    }

    alert("Compra realizada correctamente");

}


// =====================
// FACTURA
// =====================

async function generarFactura(){

    let carrito = await obtenerCarrito();

    let factura = "FACTURA\n\n";

    let total = 0;

    carrito.forEach(producto=>{

        factura +=
        producto.nombre +
        " x" +
        producto.cantidad +
        " - C$" +
        (producto.precio * producto.cantidad)
        + "\n";

        total +=
        producto.precio *
        producto.cantidad;

    });

    factura += "\nTOTAL: C$" + total;

    alert(factura);

}


// =====================
// MOSTRAR VENTAS
// =====================

async function mostrarVendidos(){

    const contenedor =
    document.getElementById(
        "productos-vendidos"
    );

    if(!contenedor){

        return;

    }

    try{

        const ventas =
        await obtenerVentas();

        contenedor.innerHTML = "";

        if(ventas.length===0){

            contenedor.innerHTML =
            "<p>No hay ventas registradas</p>";

            return;

        }

        ventas.forEach(venta=>{

            contenedor.innerHTML += `

            <div class="item-admin">

                <div>

                    <p>

                        <b>${venta.producto}</b>

                    </p>

                    <p>

                        Cantidad: ${venta.cantidad}

                    </p>

                    <p>

                        Precio: C$${venta.precio}

                    </p>

                    <p>

                        ${new Date(
                            venta.fecha
                        ).toLocaleString()}

                    </p>

                </div>

                <button

                class="btn-eliminar"

                onclick="eliminarVenta(${venta.id})"

                >

                Eliminar

                </button>

            </div>

            <hr>

            `;

        });

    }

    catch(error){

        console.error(error);

    }

}


// =====================
// ELIMINAR VENTA
// =====================

async function eliminarVenta(id){

    const confirmar = confirm(

        "¿Eliminar esta venta?"

    );

    if(!confirmar){

        return;

    }

    await eliminarVentaBD(id);

    mostrarVendidos();

}


// =====================
// CARGAR AUTOMÁTICAMENTE
// =====================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        mostrarVendidos();

    }

);