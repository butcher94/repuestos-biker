require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({

    host: process.env.DB_HOST,

    port: process.env.DB_PORT || 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME

});

conexion.connect((error)=>{

    if(error){

        console.log(error);

    }else{

        console.log("MySQL conectado");

    }

});

app.listen(process.env.PORT,()=>{

    console.log("Servidor corriendo");

});

// ==========================
// PRODUCTOS
// ==========================

app.get("/productos",(req,res)=>{

    conexion.query(
        "SELECT * FROM productos",
        (error,resultados)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json(resultados);

        }
    );

});


app.post("/productos",(req,res)=>{

    const {nombre,precio,imagen}=req.body;

    conexion.query(

        `
        INSERT INTO productos
        (nombre,precio,imagen)
        VALUES (?,?,?)
        `,

        [nombre,precio,imagen],

        (error)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json({
                mensaje:"Producto agregado"
            });

        }

    );

});

app.put("/productos/:id",(req,res)=>{

    const {nombre,precio,imagen}=req.body;

    conexion.query(

        `
        UPDATE productos
        SET nombre=?,
        precio=?,
        imagen=?
        WHERE id=?
        `,

        [
            nombre,
            precio,
            imagen,
            req.params.id
        ],

        (error)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json({
                mensaje:"Producto actualizado"
            });

        }

    );

});


app.delete("/productos/:id",(req,res)=>{

    conexion.query(

        "DELETE FROM productos WHERE id=?",

        [req.params.id],

        (error)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json({
                mensaje:"Producto eliminado"
            });

        }

    );

});


// ==========================
// VER CARRITO
// ==========================

app.get("/carrito",(req,res)=>{

    const sql = `
    SELECT
        carrito.id,
        productos.id AS producto_id,
        productos.nombre,
        productos.precio,
        productos.imagen,
        carrito.cantidad
    FROM carrito
    INNER JOIN productos
    ON carrito.producto_id = productos.id
    `;

    conexion.query(sql,(error,resultados)=>{

        if(error){

            return res.status(500).json(error);

        }

        res.json(resultados);

    });

});

// ==========================
// AGREGAR AL CARRITO
// ==========================

app.post("/carrito",(req,res)=>{

    const { producto_id } = req.body;

    const sqlBuscar = `
    SELECT * FROM carrito
    WHERE producto_id = ?
    `;

    conexion.query(
        sqlBuscar,
        [producto_id],
        (error,resultados)=>{

            if(error){

                return res.status(500).json(error);

            }

            if(resultados.length > 0){

                conexion.query(
                    `
                    UPDATE carrito
                    SET cantidad = cantidad + 1
                    WHERE producto_id = ?
                    `,
                    [producto_id],
                    (error)=>{

                        if(error){

                            return res.status(500).json(error);

                        }

                        res.json({
                            mensaje:"Cantidad actualizada"
                        });

                    }
                );

            }else{

                conexion.query(
                    `
                    INSERT INTO carrito
                    (producto_id,cantidad)
                    VALUES (?,1)
                    `,
                    [producto_id],
                    (error)=>{

                        if(error){

                            return res.status(500).json(error);

                        }

                        res.json({
                            mensaje:"Producto agregado"
                        });

                    }
                );

            }

        }
    );

});


app.put("/carrito/restar/:id",(req,res)=>{

    conexion.query(

        `
        UPDATE carrito
        SET cantidad = cantidad - 1
        WHERE id = ?
        AND cantidad > 1
        `,

        [req.params.id],

        (error)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json({
                mensaje:"Cantidad disminuida"
            });

        }

    );

});

app.put("/carrito/sumar/:id",(req,res)=>{

    conexion.query(

        `
        UPDATE carrito
        SET cantidad = cantidad + 1
        WHERE id = ?
        `,

        [req.params.id],

        (error)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json({
                mensaje:"Cantidad aumentada"
            });

        }

    );

});

// ==========================
// ELIMINAR DEL CARRITO
// ==========================

app.delete("/carrito/:id",(req,res)=>{

    conexion.query(
        "DELETE FROM carrito WHERE id = ?",
        [req.params.id],
        (error)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json({
                mensaje:"Producto eliminado"
            });

        }
    );

});


// ==========================
// VER VENTAS
// ==========================

app.get("/ventas",(req,res)=>{

    conexion.query(

        "SELECT * FROM ventas ORDER BY fecha DESC",

        (error,resultados)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json(resultados);

        }

    );

});


// ==========================
// REALIZAR COMPRA
// ==========================

app.post("/comprar",(req,res)=>{

    const sql = `

    SELECT
        productos.nombre,
        carrito.cantidad,
        productos.precio
    FROM carrito
    INNER JOIN productos
    ON carrito.producto_id = productos.id

    `;

    conexion.query(sql,(error,productos)=>{

        if(error){

            return res.status(500).json(error);

        }

        if(productos.length===0){

            return res.json({
                mensaje:"Carrito vacío"
            });

        }

        let pendientes = productos.length;

        productos.forEach(producto=>{

            conexion.query(

                `
                INSERT INTO ventas
                (producto,cantidad,precio)
                VALUES (?,?,?)
                `,

                [

                    producto.nombre,
                    producto.cantidad,
                    producto.precio

                ],

                (error)=>{

                    if(error){

                        return res.status(500).json(error);

                    }

                    pendientes--;

                    if(pendientes===0){

                        conexion.query(

                            "DELETE FROM carrito",

                            ()=>{

                                res.json({

                                    mensaje:"Compra realizada"

                                });

                            }

                        );

                    }

                }

            );

        });

    });

});






// ==========================
// PERSONAL
// ==========================

app.get("/personal",(req,res)=>{

    conexion.query(

        "SELECT * FROM personal",

        (error,resultados)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json(resultados);

        }

    );

});

app.post("/personal",(req,res)=>{

    const {nombre}=req.body;

    conexion.query(

        `
        INSERT INTO personal
        (nombre)
        VALUES (?)
        `,

        [nombre],

        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Empleado agregado"
            });

        }

    );

});

app.put("/personal/:id",(req,res)=>{

    const {nombre}=req.body;

    conexion.query(

        `
        UPDATE personal
        SET nombre=?
        WHERE id=?
        `,

        [nombre,req.params.id],

        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Empleado actualizado"
            });

        }

    );

});

app.delete("/personal/:id",(req,res)=>{

    conexion.query(

        "DELETE FROM personal WHERE id=?",

        [req.params.id],

        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Empleado eliminado"
            });

        }

    );

});


// ==========================
// PROVEEDORES
// ==========================

app.get("/proveedores",(req,res)=>{

    conexion.query(

        "SELECT * FROM proveedores",

        (error,resultados)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json(resultados);

        }

    );

});

app.post("/proveedores",(req,res)=>{

    const {nombre,producto}=req.body;

    conexion.query(

        `
        INSERT INTO proveedores
        (nombre,producto)
        VALUES (?,?)
        `,

        [nombre,producto],

        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Proveedor agregado"
            });

        }

    );

});

app.put("/proveedores/:id",(req,res)=>{

    const {nombre,producto}=req.body;

    conexion.query(

        `
        UPDATE proveedores
        SET nombre=?,
        producto=?
        WHERE id=?
        `,

        [nombre,producto,req.params.id],

        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Proveedor actualizado"
            });

        }

    );

});

app.delete("/proveedores/:id",(req,res)=>{

    conexion.query(

        "DELETE FROM proveedores WHERE id=?",

        [req.params.id],

        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Proveedor eliminado"
            });

        }

    );

});


// ==========================
// ELIMINAR VENTAS
// ==========================

app.delete("/ventas/:id",(req,res)=>{

    conexion.query(

        "DELETE FROM ventas WHERE id=?",

        [req.params.id],

        (error)=>{

            if(error){
                return res.status(500).json(error);
            }

            res.json({
                mensaje:"Venta eliminada"
            });

        }

    );

});



// ==========================
// USUARIOS
// ==========================

// OBTENER USUARIOS

app.get("/usuarios",(req,res)=>{

    conexion.query(

        "SELECT * FROM usuarios",

        (error,resultados)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json(resultados);

        }

    );

});


// AGREGAR USUARIO

app.post("/usuarios", async (req,res)=>{

    const {

        nombre,
        email,
        password

    } = req.body;

    try{

        const passwordHash =
        await bcrypt.hash(password,10);

        console.log("Contraseña original:", password);

        console.log("Hash generado:", passwordHash);

        conexion.query(

            `
            INSERT INTO usuarios
            (nombre,email,password)
            VALUES (?,?,?)
            `,

            [

                nombre,
                email,
                passwordHash

            ],

            (error)=>{

                if(error){

                    return res.status(500).json(error);

                }

                res.json({

                    mensaje:"Usuario agregado"

                });

            }

        );

    }

    catch(error){

        res.status(500).json(error);

    }

});

// ACTUALIZAR USUARIO

app.put("/usuarios/:id", async (req,res)=>{

    const {

        nombre,
        email,
        password

    } = req.body;

    try{

        const passwordHash =
        await bcrypt.hash(password,10);

        conexion.query(

            `
            UPDATE usuarios
            SET
            nombre=?,
            email=?,
            password=?
            WHERE id=?
            `,

            [

                nombre,
                email,
                passwordHash,
                req.params.id

            ],

            (error)=>{

                if(error){

                    return res.status(500).json(error);

                }

                res.json({

                    mensaje:"Usuario actualizado"

                });

            }

        );

    }

    catch(error){

        res.status(500).json(error);

    }

});
// ELIMINAR USUARIO

app.delete("/usuarios/:id",(req,res)=>{

    conexion.query(

        "DELETE FROM usuarios WHERE id=?",

        [req.params.id],

        (error)=>{

            if(error){

                return res.status(500).json(error);

            }

            res.json({

                mensaje:"Usuario eliminado"

            });

        }

    );

});

// ==========================
// LOGIN
// ==========================

app.post("/login",(req,res)=>{

    const {

        email,
        password

    } = req.body;

    conexion.query(

        `
        SELECT *
        FROM usuarios
        WHERE email = ?
        OR nombre = ?
        `,

        [

            email,
            email

        ],

        async(error,resultados)=>{

            if(error){

                return res.status(500).json(error);

            }

            if(resultados.length===0){

                return res.json({

                    success:false

                });

            }

            const usuario = resultados[0];

            const coincide = await bcrypt.compare(

                password,

                usuario.password

            );

            if(!coincide){

                return res.json({

                    success:false

                });

            }

            res.json({

                success:true,

                usuario:{

                    id:usuario.id,
                    nombre:usuario.nombre,
                    email:usuario.email,
                    rol:usuario.rol

                }

            });

        }

    );

});