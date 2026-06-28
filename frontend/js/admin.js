
cargarProductosAdmin();

async function cargarProductosAdmin(){

    productos = await obtenerProductos();

    mostrarProductosAdmin();

}

// ===== ADMIN PRODUCTOS =====

let editandoProducto = null;

// ===== MOSTRAR PRODUCTOS =====

function mostrarProductosAdmin(lista = productos){

const tabla =
document.getElementById(
"lista-productos-admin"
);

if(!tabla) return;

tabla.innerHTML = "";

lista.forEach((producto,index)=>{

tabla.innerHTML += `

<tr>

<td>

<img src="${producto.imagen}">

</td>

<td>${producto.nombre}</td>

<td>C$${producto.precio}</td>

<td>

<button
class="btn-editar"
onclick="editarProducto(${index})">

Editar

</button>

<button
class="btn-eliminar"
onclick="eliminarProductoAdmin(${index})">

Eliminar

</button>

</td>

</tr>

`;

});

}


// ===== BUSCADOR =====

function buscarProductosAdmin(){

const texto =
document.getElementById(
"buscarAdmin"
).value.toLowerCase();

const filtrados =
productos.filter(producto=>

producto.nombre
.toLowerCase()
.includes(texto)

);

mostrarProductosAdmin(filtrados);

}

// ===== AGREGAR PRODUCTO =====

function agregarProductoAdmin(){

const nombre =
document.getElementById(
"nombre"
).value;

const precio =
document.getElementById(
"precio"
).value;

const imagenInput =
document.getElementById(
"imagenFile"
);

if(!nombre || !precio){

alert("Completa todos los campos");

return;

}

const archivo =
imagenInput.files[0];

// ===== SI HAY IMAGEN =====

if(archivo){

const reader = new FileReader();

reader.onload = function(e){

guardarProducto(
nombre,
precio,
e.target.result
);

};

reader.readAsDataURL(archivo);

}else{

guardarProducto(
nombre,
precio,
"img/repuesto1.jpg"
);

}

}

// ===== GUARDAR PRODUCTO =====

async function guardarProducto(nombre,precio,imagen){

    if(editandoProducto!==null){

        await actualizarProducto(

            productos[editandoProducto].id,

            nombre,

            precio,

            imagen

        );

        editandoProducto=null;

    }

    else{

        await guardarProductoBD(
            nombre,
            precio,
            imagen
        );

    }

    productos=await obtenerProductos();

    mostrarProductosAdmin();

    limpiarFormulario();

    alert("Producto guardado");

}
// ===== EDITAR =====

function editarProducto(index){

const producto =
productos[index];

document.getElementById(
"nombre"
).value =
producto.nombre;

document.getElementById(
"precio"
).value =
producto.precio;

editandoProducto = index;

window.scrollTo({

top:0,
behavior:"smooth"

});

}

// ===== ELIMINAR =====

async function eliminarProductoAdmin(index){

    if(confirm("¿Eliminar producto?")){

        await eliminarProductoBD(
            productos[index].id
        );

        productos = await obtenerProductos();

        mostrarProductosAdmin();

    }

}

// ===== LIMPIAR =====

function limpiarFormulario(){

document.getElementById(
"nombre"
).value = "";

document.getElementById(
"precio"
).value = "";

document.getElementById(
"imagenFile"
).value = "";

}