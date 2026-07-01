let usuarios = [];

let usuarioEditando = null;

cargarUsuarios();

async function cargarUsuarios(){

    usuarios = await obtenerUsuarios();

    mostrarUsuarios();

}

async function agregarUsuario(){

    const nombre =
    document.getElementById(
        "usuarioInput"
    ).value;

    const email =
    document.getElementById(
        "emailInput"
    ).value;

    const password =
    document.getElementById(
        "passwordInput"
    ).value;

    if(
        !nombre ||
        !email ||
        !password
    ){

        alert(
            "Completa todos los campos"
        );

        return;

    }

    if(usuarioEditando){

        await actualizarUsuario(

            usuarioEditando,

            nombre,

            email,

            password

        );

        usuarioEditando = null;

    }

    else{

        await registrarUsuario(

            nombre,

            email,

            password

        );

    }

    document.getElementById(
        "usuarioInput"
    ).value = "";

    document.getElementById(
        "emailInput"
    ).value = "";

    document.getElementById(
        "passwordInput"
    ).value = "";

    await cargarUsuarios();

}

function mostrarUsuarios(){

    const lista =
    document.getElementById(
        "lista-usuarios"
    );

    if(!lista) return;

    lista.innerHTML = "";

    usuarios.forEach(usuario=>{

        lista.innerHTML += `

        <div class="item-admin">

            <div>

                <p>
                <b>${usuario.nombre}</b>
                </p>

                <p>
                ${usuario.email}
                </p>

            </div>

            <div>

                <button
                class="btn-editar"
                onclick="editarUsuario(${usuario.id})">

                Editar

                </button>

                <button
                class="btn-eliminar"
                onclick="eliminarUsuario(${usuario.id})">

                X

                </button>

            </div>

        </div>

        `;

    });

}

function editarUsuario(id){

    const usuario =
    usuarios.find(
        u => u.id === id
    );

    if(!usuario) return;

    document.getElementById(
        "usuarioInput"
    ).value =
    usuario.nombre;

    document.getElementById(
        "emailInput"
    ).value =
    usuario.email;

    // Nunca mostrar la contraseña cifrada
    document.getElementById(
        "passwordInput"
    ).value = "";

    usuarioEditando = id;

}

async function eliminarUsuario(id){

    if(
        !confirm(
            "¿Eliminar usuario?"
        )
    ) return;

    await eliminarUsuarioBD(id);

    await cargarUsuarios();

}