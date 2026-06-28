// ======================
// PRODUCTOS
// ======================

async function obtenerProductos(){

    const respuesta = await fetch(
        "http://localhost:3000/productos"
    );

    return await respuesta.json();

}

async function guardarProductoBD(nombre,precio,imagen){

    await fetch(

        "http://localhost:3000/productos",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre,
                precio,
                imagen

            })

        }

    );

}



async function actualizarProducto(id,nombre,precio,imagen){

    await fetch(

        "http://localhost:3000/productos/"+id,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre,
                precio,
                imagen

            })

        }

    );

}

async function eliminarProductoBD(id){

    await fetch(

        "http://localhost:3000/productos/" + id,

        {

            method:"DELETE"

        }

    );

}


// ======================
// CARRITO
// ======================

async function obtenerCarrito(){

    const respuesta = await fetch(
        "http://localhost:3000/carrito"
    );

    return await respuesta.json();

}

async function agregarAlCarrito(id){

    await fetch(
        "http://localhost:3000/carrito",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                producto_id:id
            })
        }
    );

}

async function eliminarDelCarrito(id){

    await fetch(
        "http://localhost:3000/carrito/" + id,
        {
            method:"DELETE"
        }
    );

}

async function sumarCantidad(id){

    await fetch(
        "http://localhost:3000/carrito/sumar/" + id,
        {
            method:"PUT"
        }
    );

}

async function restarCantidad(id){

    await fetch(
        "http://localhost:3000/carrito/restar/" + id,
        {
            method:"PUT"
        }
    );

}

// ======================
// VENTAS
// ======================

async function obtenerVentas(){

    const respuesta = await fetch(

        "http://localhost:3000/ventas"

    );

    return await respuesta.json();

}


async function comprarProductos(){

    await fetch(

        "http://localhost:3000/comprar",

        {

            method:"POST"

        }

    );

}

// ======================
// USUARIOS
// ======================

async function obtenerUsuarios(){

    const respuesta = await fetch(
        "http://localhost:3000/usuarios"
    );

    return await respuesta.json();

}

async function guardarUsuario(nombre){

    await fetch(

        "http://localhost:3000/usuarios",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre

            })

        }

    );

}

async function actualizarUsuario(id,nombre){

    await fetch(

        "http://localhost:3000/usuarios/" + id,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre

            })

        }

    );

}

async function eliminarUsuarioBD(id){

    await fetch(

        "http://localhost:3000/usuarios/" + id,

        {

            method:"DELETE"

        }

    );

}


// ======================
// PERSONAL
// ======================

async function obtenerPersonal(){

    const respuesta = await fetch(
        "http://localhost:3000/personal"
    );

    return await respuesta.json();

}

async function guardarPersonal(nombre){

    await fetch(

        "http://localhost:3000/personal",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre

            })

        }

    );

}

async function actualizarPersonal(id,nombre){

    await fetch(

        "http://localhost:3000/personal/" + id,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre

            })

        }

    );

}

async function eliminarPersonalBD(id){

    await fetch(

        "http://localhost:3000/personal/" + id,

        {

            method:"DELETE"

        }

    );

}


// ======================
// PROVEEDORES
// ======================

async function obtenerProveedores(){

    const respuesta = await fetch(
        "http://localhost:3000/proveedores"
    );

    return await respuesta.json();

}

async function guardarProveedor(nombre,producto){

    await fetch(

        "http://localhost:3000/proveedores",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre,
                producto

            })

        }

    );

}

async function actualizarProveedor(id,nombre,producto){

    await fetch(

        "http://localhost:3000/proveedores/" + id,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre,
                producto

            })

        }

    );

}

async function eliminarProveedorBD(id){

    await fetch(

        "http://localhost:3000/proveedores/" + id,

        {

            method:"DELETE"

        }

    );

}


// ======================
// ELIMINAR VENTA
// ======================

async function eliminarVentaBD(id){

    await fetch(

        "http://localhost:3000/ventas/" + id,

        {

            method:"DELETE"

        }

    );

}


async function iniciarSesion(nombre,password){

    const respuesta = await fetch(

        "http://localhost:3000/login",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre,
                password

            })

        }

    );

    return await respuesta.json();

}


// ======================
// LOGIN
// ======================

async function iniciarSesion(
    nombre,
    password
){

    const respuesta = await fetch(

        "http://localhost:3000/login",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                nombre,
                password

            })

        }

    );

    return await respuesta.json();

}


// ======================
// USUARIOS
// ======================

async function obtenerUsuarios(){

    const respuesta =
    await fetch(
        "http://localhost:3000/usuarios"
    );

    return await respuesta.json();

}

async function registrarUsuario(
    nombre,
    email,
    password
){

    await fetch(

        "http://localhost:3000/usuarios",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                nombre,
                email,
                password

            })

        }

    );

}

async function actualizarUsuario(
    id,
    nombre,
    email,
    password
){

    await fetch(

        "http://localhost:3000/usuarios/" + id,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                nombre,
                email,
                password

            })

        }

    );

}

async function eliminarUsuarioBD(id){

    await fetch(

        "http://localhost:3000/usuarios/" + id,

        {

            method:"DELETE"

        }

    );

}


// ======================
// LOGIN
// ======================

async function loginUsuario(email,password){

    const respuesta = await fetch(

        "http://localhost:3000/login",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email,
                password

            })

        }

    );

    return await respuesta.json();

}