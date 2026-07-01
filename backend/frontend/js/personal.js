// =====================
// PERSONAL
// =====================

let personal = [];

cargarPersonal();

async function cargarPersonal(){

    personal = await obtenerPersonal();

    mostrarPersonal();

}


// =====================
// AGREGAR
// =====================

async function agregarPersonal(){

    const input =
    document.getElementById(
        "personalInput"
    );

    const nombre = input.value;

    if(!nombre){

        return;

    }

    await guardarPersonal(nombre);

    input.value = "";

    cargarPersonal();

}


// =====================
// MOSTRAR
// =====================

function mostrarPersonal(){

    const lista =
    document.getElementById(
        "lista-personal"
    );

    if(!lista) return;

    lista.innerHTML = "";

    personal.forEach(persona=>{

        lista.innerHTML += `

        <div class="item-admin">

            <p>${persona.nombre}</p>

            <div>

                <button
                class="btn-editar"
                onclick="editarPersonal(${persona.id})">

                Editar

                </button>

                <button
                class="btn-eliminar"
                onclick="eliminarPersonal(${persona.id})">

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

async function editarPersonal(id){

    const empleado =
    personal.find(
        p=>p.id===id
    );

    const nuevo = prompt(

        "Editar empleado",

        empleado.nombre

    );

    if(!nuevo){

        return;

    }

    await actualizarPersonal(

        id,

        nuevo

    );

    cargarPersonal();

}


// =====================
// ELIMINAR
// =====================

async function eliminarPersonal(id){

    if(!confirm("¿Eliminar empleado?")){

        return;

    }

    await eliminarPersonalBD(id);

    cargarPersonal();

}