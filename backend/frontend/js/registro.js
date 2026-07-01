const formulario =
document.getElementById(
    "registroForm"
);

formulario.addEventListener(

    "submit",

    async function(e){

        e.preventDefault();

        const nombre =
        document.getElementById(
            "nombre"
        ).value;

        const email =
        document.getElementById(
            "email"
        ).value;

        const password =
        document.getElementById(
            "password"
        ).value;

        const mensaje =
        document.getElementById(
            "mensaje"
        );

        try{

            await registrarUsuario(

                nombre,
                email,
                password

            );

            mensaje.style.color =
            "green";

            mensaje.textContent =
            "Usuario registrado correctamente";

            setTimeout(()=>{

                window.location.href =
                "login.html";

            },1500);

        }

        catch(error){

            mensaje.style.color =
            "red";

            mensaje.textContent =
            "Error al registrar usuario";

            console.error(error);

        }

    }

);