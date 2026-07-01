const formulario = document.getElementById("loginForm");

if(formulario){

    formulario.addEventListener("submit", async function(e){

        e.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();

        const password = document.getElementById("password").value;

        const mensaje = document.getElementById("mensaje");

        if(usuario === "" || password === ""){

            mensaje.style.color = "red";

            mensaje.textContent = "Complete todos los campos.";

            return;

        }

        try{

            const resultado = await loginUsuario(

                usuario,
                password

            );

            if(resultado.success){

                mensaje.style.color = "green";

                localStorage.setItem(

                    "usuarioLogueado",

                    JSON.stringify(resultado.usuario)

                );

                if(resultado.usuario.rol === "admin"){

                    mensaje.textContent = "Entrando como administrador...";

                    setTimeout(()=>{

                        window.location.href = "panel-admin.html";

                    },1000);

                }else{

                    mensaje.textContent = "Entrando a la tienda...";

                    setTimeout(()=>{

                        window.location.href = "tienda.html";

                    },1000);

                }

            }else{

                mensaje.style.color = "red";

                mensaje.textContent = "Usuario o contraseña incorrectos";

            }

        }catch(error){

            console.error(error);

            mensaje.style.color = "red";

            mensaje.textContent = "Error al iniciar sesión.";

        }

    });

}