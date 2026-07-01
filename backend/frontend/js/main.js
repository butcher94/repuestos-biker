// ===== ABRIR IMAGEN =====

function abrirImagen(imagen){

const modal =
document.getElementById(
"modal-imagen"
);

if(!modal) return;

modal.style.display = "flex";

document.getElementById(
"imagen-grande"
).src = imagen;

}

// ===== CERRAR IMAGEN =====

function cerrarImagen(){

const modal =
document.getElementById(
"modal-imagen"
);

if(!modal) return;

modal.style.display = "none";

}

// ===== NOTIFICACIÓN =====

function mostrarNotificacion(){

const notificacion =
document.getElementById(
"notificacion"
);

if(!notificacion) return;

notificacion.style.display =
"block";

setTimeout(()=>{

notificacion.style.display =
"none";

},2000);

}

// ===== ACCESO ADMIN OCULTO =====

document.addEventListener(
"keydown",
function(event){

if(
event.ctrlKey &&
event.shiftKey &&
event.key.toLowerCase() === "a"
){

const password = prompt(
"Ingrese contraseña administrador"
);

if(password === "0070"){

window.location.href =
"panel-admin.html";

}else{

alert("Contraseña incorrecta");

}

}

});