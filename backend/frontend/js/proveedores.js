// =====================
// PROVEEDORES
// =====================

let proveedores = [];

cargarProveedores();

async function cargarProveedores(){

    proveedores = await obtenerProveedores();

    mostrarProveedores();

}


// =====================
// AGREGAR
// =====================

async function agregarProveedor(){

    const nombre =
    document.getElementById(
        "proveedorInput"
    ).value;

    const producto =
    document.getElementById(
        "productoProveedor"
    ).value;

    if(!nombre || !producto){

        return;

    }

    await guardarProveedor(

        nombre,

        producto

    );

    document.getElementById(
        "proveedorInput"
    ).value = "";

    document.getElementById(
        "productoProveedor"
    ).value = "";

    cargarProveedores();

}


// =====================
// MOSTRAR
// =====================

function mostrarProveedores(){

    const lista =
    document.getElementById(
        "lista-proveedores"
    );

    if(!lista) return;

    lista.innerHTML = "";

    proveedores.forEach(proveedor=>{

        lista.innerHTML += `

        <div class="item-admin">

            <div>

                <p><b>${proveedor.nombre}</b></p>

                <p>${proveedor.producto}</p>

            </div>

            <div>

                <button
                class="btn-editar"
                onclick="editarProveedor(${proveedor.id})">

                Editar

                </button>

                <button
                class="btn-eliminar"
                onclick="eliminarProveedor(${proveedor.id})">

                X

                </button>

            </div>

        </div>

        `;

    });

}


// =====================
// EDITAR
// =====================

async function editarProveedor(id){

    const proveedor =
    proveedores.find(
        p=>p.id===id
    );

    const nuevoNombre = prompt(

        "Editar proveedor",

        proveedor.nombre

    );

    if(!nuevoNombre){

        return;

    }

    const nuevoProducto = prompt(

        "Editar producto",

        proveedor.producto

    );

    if(!nuevoProducto){

        return;

    }

    await actualizarProveedor(

        id,

        nuevoNombre,

        nuevoProducto

    );

    cargarProveedores();

}


// =====================
// ELIMINAR
// =====================

async function eliminarProveedor(id){

    if(!confirm("¿Eliminar proveedor?")){

        return;

    }

    await eliminarProveedorBD(id);

    cargarProveedores();

}