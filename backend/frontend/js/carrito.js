let carrito = [];

cargarCarrito();

async function cargarCarrito(){

    carrito = await obtenerCarrito();

    actualizarContador();

}

async function agregarCarrito(id){

    await agregarAlCarrito(id);

    carrito = await obtenerCarrito();

    actualizarContador();

    mostrarNotificacion();

}

function actualizarContador(){

    const total = carrito.reduce(
        (acc,item)=> acc + item.cantidad,
        0
    );

    const contador =
    document.getElementById(
        "contador-carrito"
    );

    if(contador){

        contador.textContent = total;

    }

}

async function abrirCarrito(){

    carrito = await obtenerCarrito();

    document.getElementById(
        "modal-carrito"
    ).style.display = "flex";

    mostrarCarrito();

}

function cerrarCarrito(){

    document.getElementById(
        "modal-carrito"
    ).style.display = "none";

}

function mostrarCarrito(){

    const lista =
    document.getElementById(
        "lista-carrito"
    );

    if(!lista) return;

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach(producto=>{

        total +=
        Number(producto.precio) *
        producto.cantidad;

        lista.innerHTML += `

        <div class="item-carrito">

            <div>

                <p>${producto.nombre}</p>

                <p>C$${producto.precio}</p>

            </div>

            <div>

                <button onclick="disminuir(${producto.id})">

                    -

                </button>

                <span>${producto.cantidad}</span>

                <button onclick="aumentar(${producto.id})">

                    +

                </button>

                <button onclick="eliminarProducto(${producto.id})">

                    X

                </button>

            </div>

        </div>

        `;

    });

    document.getElementById(
        "total"
    ).textContent =
    "Total: C$" + total;

}

async function eliminarProducto(id){

    await eliminarDelCarrito(id);

    carrito = await obtenerCarrito();

    mostrarCarrito();

    actualizarContador();

}

async function aumentar(id){

    await sumarCantidad(id);

    carrito = await obtenerCarrito();

    mostrarCarrito();

    actualizarContador();

}

async function disminuir(id){

    await restarCantidad(id);

    carrito = await obtenerCarrito();

    mostrarCarrito();

    actualizarContador();

}