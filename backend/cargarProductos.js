const mysql = require("mysql2");

const conexion = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"12345678",
    database:"repuestos_biker"

});

conexion.connect((error)=>{

    if(error){

        console.log(error);
        return;

    }

    console.log("Conectado a MySQL");


});


const productos = [
    {
nombre:"Filtro de aceite pulsar 135LS",
precio:150,
imagen:"img/repuesto1.jpg"
},

{
nombre:"carburador 250",
precio:4500,
imagen:"img/repuesto2.jpg"
},

{
nombre:"Batería 7A 12V Multipropósito Carga Cíclica O Flotante - FUB-1270 Forza",
precio:950,
imagen:"img/bateria.jpg"
},

{
nombre:"Pastilla De Freno Delantero Original Honda Pcx 150 19-21 ",
precio:600,
imagen:"img/pastilla de freno.webp"
},

{
nombre:"Llanta Deportiva Pirelli Diablo Rosso 3 Tamaño: 110/70R17 54H TL",
precio:5000,
imagen:"img/llanta deportiva.webp"
},

{
nombre:"ALTERNADOR 12V 18P DYNAMO HONDA CB190R TRIFASICO",
precio:1500,
imagen:"img/alternador honda.webp"
},

{
nombre:"Bujía NGK CR10EK ",
precio:100,
imagen:"img/bujia nkg.jpg"
},

{
nombre:"careta pulsar 135LS",
precio:2300,
imagen:"img/careta pulsar 135.jpg"
},

{
nombre:"Aro delantero ",
precio:2400,
imagen:"img/aro delantero.jpg"
},

{
nombre:"Kit válvulas pulsar 180 ug ",
precio:1600,
imagen:"img/valvula de 180.png"
},

{
nombre:"Cigueñal Moto Pulsar Ns 200 / As 200 / Rs 200 / Bajaj ",
precio:7200,
imagen:"img/cigueñal 200 ns.jpg"
},

{
nombre:"Horquilla Delantera Moto Pulsar Ns 200 Ug / Ns 160 Ug / Bajaj ",
precio:8000,
imagen:"img/horquilla delantera.jpg"
},

{
nombre:"Faro halogeno Led U7, Ojo De Angel, Exploradora Aro Azul ",
precio:350,
imagen:"img/halogeno.webp"
},

{
nombre:"Salpicadera Guarda Fango Lodera Para Motocicleta Universal ",
precio:500,
imagen:"img/guardafango.jpg"
},

{
nombre:"montura para GENESIS HJ 125 ",
precio:1450,
imagen:"img/montura genesis.jpg"
},

{
nombre:"RIN TRASERO DE RAYOS COMPLETO ITALIKA DM150 ",
precio:2700,
imagen:"img/rin de rayo.png"
},

{
nombre:"Discos de clutch AX 100 5PCS GX ",
precio:1300,
imagen:"img/Discos de clutch.webp"
},

{
nombre:"Disco de Freno Delantero Moto Pulsar Ns 200 / As 200 / Bajaj ",
precio:1100,
imagen:"img/disco de freno.jpg"
},

{
nombre:"Pidevias Direccionales Para Moto LED Secuencial Tipo Zafiro Universal ",
precio:780,
imagen:"img/direccionales.webp"
},

{
nombre:" ESPEJOS MOTO DEPORTIVOS GP UNIVERSAL PARA TODAS LAS MOTOS",
precio:400,
imagen:"img/espejos de lujo.webp"

},

{
nombre:"Kits de pistón de motocicleta (pistón, anillo, pasador, clip) para Rx150 ",
precio:2100,
imagen:"img/piston.avif"
},

{
nombre:"CG150 Kit de cilindro con un grado de calidad enfriado por aire  ",
precio:4300,
imagen:"img/cilindro.webp"
},

{
nombre:"tanque de gasolina boxer 150 ",
precio:2300,
imagen:"img/tanque boxer.jpg"
},

{
nombre:"tanque de gasolina dayun 150 ",
precio:1900,
imagen:"img/tanque dayun.jpg"
},

{
nombre:"tanque de gasolina genesis rks 150 ",
precio:2750,
imagen:"img/tanque rks.jpg"
},

{
nombre:" tanque de gasolina pulsar 135LS",
precio:3000,
imagen:"img/tanque 135.jpg"
},

{
nombre:"tanque de gasolina hj 125 ",
precio:2000,
imagen:"img/tanque hj.jpg"
},

{
nombre:"tanque de gasolina gxt 200 ",
precio:2900,
imagen:"img/tanque gxt.jpg"
},

{
nombre:" tanque de gasolina Raybar 125",
precio:3000,
imagen:"img/tanque raybar.jpg"
},

{
nombre:"llantas DUNLOP MOTO3 115/75R17 ",
precio:5800,
imagen:"img/llanta dunlop.jpg"
},

{
nombre:"llanta 80/90-14  PISTA MAXIMA TYRE ",
precio:4600,
imagen:"img/llanta.jpg"
},

{
nombre:"Llanta Michelin Pilot Street 2.50-17 Moto ",
precio:6100,
imagen:"img/llanta michelin.png"
},

{
nombre:" mordasa Caliper Freno Delantero Moto Pulsar Ns 160 / Ns 150 / As 150 / Pulsar Ns 125 / Pulsar 180 / Neon / Bajaj",
precio:2300,
imagen:"img/caliper mordaza.jpg"
},

{
nombre:" caliper MORDAZA FRENO GY200 TRAS vini",
precio:2400,
imagen:"img/mordaza caliper vini.jpg"
},

{
nombre:"BRAZO FRENO TRASERO AX100 ktm ",
precio:120,
imagen:"img/brazo freno.jpg"
},

{
nombre:"DISCO FRENO XR150L/XR190 DELANTERO vini ",
precio:900,
imagen:"img/disco vini.jpg"
},

{
nombre:"BUJIA IRIDIUM MOTOS YAMA-HONDA-KAWA-KTM ROSCA 12 MM EN 18 MM ",
precio:400,
imagen:"img/bujia iridium.webp"
},

{
nombre:"Bujia para moto 125 200 250 hilo 12 BRISK BR12YC reemplazo NGK DPR8 DR8 D8 ",
precio:300,
imagen:"img/bujia br.jpg"
},

{
nombre:"Casco para moto HRO Integral Abierto Variado ",
precio:2000,
imagen:"img/casco hro.webp"
},

{
nombre:"Casco cerrado cross True Rider Trex FTREX TR004NAR L Negro y anaranjado ",
precio:3000,
imagen:"img/casco cross.webp"
},

{
nombre:"Casco MT Targo Rojo y negro ",
precio:4500,
imagen:"img/casco mt.webp"
},

{
nombre:"Casco Moto Integral Ls2 320 Stream Evo Negro Brillo Pr Color Negro Brillo Tamaño Del Casco Xs ",
precio:3200,
imagen:"img/casco ls2.webp"
},

{
nombre:"Casco Integral Hjc Rpha 12 - Fibra De Carbono Para Moto Casco Venom",
precio:2300,
imagen:"img/casco hjc.avif"
},

{
nombre:"Casco Certificado DOT RNG701M | GreenLine Motos Eléctricas ",
precio:1300,
imagen:"img/casco dot.webp"
},

{
nombre:"LS2 Helmets Explorer Adventure Helmet - Tamaño Small - Color Solid Matte Black ",
precio:3600,
imagen:"img/casco ls.jpg"
},

{
nombre:" Casco Supertech R10 Arius",
precio:3500,
imagen:"img/casco arius.webp"
},

{
nombre:"Kit de manecillas de lujo!  ",
precio:700,
imagen:"img/kit manecilla.jpg"
},

{
nombre:"MANECILLAS EN PAR ALUMINIO CNC ANODIZADA DORADO/PULIDO Y YBR 125 (D) ",
precio:600,
imagen:"img/manecillas doradas.jpg"
},

{
nombre:"Escapes AKRAPOVIC con silenciador y kit de instalación ",
precio:1600,
imagen:"img/escape.jpg"
},

{
nombre:" Escape Moto Deportivo Y Silenciador Inoxidable Rojo 38-51mm",
precio:1900,
imagen:"img/escape rojo.png"
},

{
nombre:"Tubo de escape de moto y scooter ",
precio:1340,
imagen:"img/tubo de escape.jpg"
},

{
nombre:" ESCAPE DEPORTIVO UNIVERSAL MOTO TRABAJO Y PISTA CARBONO",
precio:2000,
imagen:"img/escape carbon.jpg"
},

{
nombre:"Motor de arranque para moto Italika Dm 200 07-19/ Tc ",
precio:1600,
imagen:"img/motor de arranque.avif"
},

{
nombre:"MOTOR DE ARRANQUE GXT200 ",
precio:1300,
imagen:"img/motor gxt.webp"
},

{
nombre:"Careta universal para enduro SM, Negro ",
precio:1200,
imagen:"img/careta negra.jpg"
},

{
nombre:" Careta Completa para BAJAJ PULSAR 180/220 Genérico",
precio:2500,
imagen:"img/careta 180.jpg"
},

{
nombre:"Cuchillo del Brayan ",
precio:300,
imagen:"img/cuchillo.jpg"
},

{
nombre:"outfit del Brayan, incluye las chinelas para un mayor sigilo y rapides al moverse ",
precio:1000,
imagen:"img/outfit del brayan.jpg"
},

{
nombre:" Machete del Kevin, muy letal a corta distancia. viene con un plus de sarro muy efectivo",
precio:200,
imagen:"img/machete del kevin.jpg"
},

{
nombre:"Moto del Kevin con resonador full chillido rompe timpano. incluye espacio debajo del tanque para guardar el fierro",
precio:14000,
imagen:"img/moto del kevin.jpg"
},

{
nombre:"Pastillas Delanteras Pulsar Ns 150 / 160 Original Bajaj ",
precio:450,
imagen:"img/pastillas bajaj.webp"
},

{
nombre:"Pedal De Freno Zanella Hj 125 ",
precio:300,
imagen:"img/pedal de freno HJ.webp"
},

{
nombre:"MONOSHOCK NS200 ",
precio:3600,
imagen:"img/monoschock ns 200.webp"
},

{
nombre:" MONOSHOCK TRASERO GXT200 COMUN P002741",
precio:3000,
imagen:"img/monoschock gxt.jpg"
},

{
nombre:" Monoshock para YAMAHA XTZ125",
precio:2000,
imagen:"img/monoschock xtz.jpg"
},

{
nombre:"Aro delantero 17 Para Moto 17x3",
precio:4500,
imagen:"img/aro deportivo.jpg"
}

];

productos.forEach((producto)=>{

    conexion.query(

        "INSERT INTO productos (nombre, precio, imagen) VALUES (?, ?, ?)",

        [
            producto.nombre,
            producto.precio,
            producto.imagen
        ],

        (error)=>{

            if(error){

                console.log(error);

            }

        }

    );

});

console.log("Productos cargados");

conexion.end();
