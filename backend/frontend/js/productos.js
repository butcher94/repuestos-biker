let productos = [];

// =====================
// PAGINACIÓN
// =====================

let paginaActual = 1;
const productosPorPagina = 16;

// =====================
// CARGAR PRODUCTOS
// =====================

cargarProductos();

async function cargarProductos(){

    productos = await obtenerProductos();

    console.log(productos);

    mostrarProductos();

}

// =====================
// MOSTRAR PRODUCTOS
// =====================

function mostrarProductos(lista = productos){

    const contenedor =
    document.getElementById(
        "contenedor-productos"
    );

    if(!contenedor) return;

    contenedor.innerHTML = "";

    const inicio =
    (paginaActual - 1) *
    productosPorPagina;

    const final =
    inicio +
    productosPorPagina;

    const productosPagina =
    lista.slice(
        inicio,
        final
    );

    productosPagina.forEach(producto=>{

        contenedor.innerHTML += `

        <div class="producto">

            <img
            src="${producto.imagen}"
            onclick='abrirImagen("${producto.imagen}")'>

            <h3>${producto.nombre}</h3>

            <p>C$${producto.precio}</p>

            <button
            onclick="agregarCarrito(${producto.id})">

                Agregar al carrito

            </button>

        </div>

        `;

    });

}

// =====================
// ACTIVAR BOTÓN 1
// =====================

const botones =
document.querySelectorAll(
".paginacion button"
);

if(botones[0]){

    botones[0].classList.add(
        "activa"
    );

}

// =====================
// BUSCADOR
// =====================

const buscador =
document.getElementById(
"buscador"
);

if(buscador){

    buscador.addEventListener(
        "keyup",
        ()=>{

            const texto =
            buscador.value.toLowerCase();

            const filtrados =
            productos.filter(
                producto=>

                producto.nombre
                .toLowerCase()
                .includes(texto)

            );

            paginaActual = 1;

            mostrarProductos(
                filtrados
            );

        }

    );

}

// =====================
// CAMBIAR PÁGINA
// =====================

function cambiarPagina(numero){

    paginaActual = numero;

    mostrarProductos();

    const botones =
    document.querySelectorAll(
        ".paginacion button"
    );

    botones.forEach(btn=>{

        btn.classList.remove(
            "activa"
        );

    });

    if(botones[numero-1]){

        botones[numero-1]
        .classList.add(
            "activa"
        );

    }

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}