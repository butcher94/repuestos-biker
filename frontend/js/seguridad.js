const usuario = JSON.parse(

    localStorage.getItem(

        "usuarioLogueado"

    )

);

if(

    !usuario ||

    usuario.rol !== "admin"

){

    alert(

        "Acceso denegado"

    );

    window.location.href =

    "login.html";

}