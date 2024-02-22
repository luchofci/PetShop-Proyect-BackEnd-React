// const Product = require('../models/product.model');



// async function getProduct(req, res) {
//     try {
//         const id = req.params.id; //Si no viene undefined.
//         if (id) {
//             const product = await Product.findById(id) // si pongo 0 no te da ese dato, si pongo 1, te da ese elemento.

//             if (!product) {
//                 return res.status(404).send({
//                     ok: false,
//                     message: "No se encontro el productos"
//                 })
//             }

//             // user.password = undefined; Esto no es necesario dado que arriba en un objeto pusimos password 0.

//             return res.send({
//                 ok: true,
//                 product,
//                 message: "Usuario encontraro",
//             }) //mostrar error sin return // EL return es importante, xq no cortaria el IF si no esta.
//         }

//         const products = await Product.find()

//         if (!products.length) {
//             return res.status(404).send({
//                 ok: false,
//                 message: "No se encontraron productos"
//             })
//         }


//         //Devolvemos todos los usuarios
//         res.send({
//             products,
//             message: 'Productos obtenidos correctamente',
//             ok: true
//         })
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send({
//             ok: false,
//             message: 'No se pudo obtener los Productos'
//         })
//     }
// }


// async function deleteProduct(req, res) {

//     try {

//         // Comprobar si la persona que desea borrar es un ADMIN?ROLE, si no es ADMIN non lo dejo continuar.

//         VER
//         if(req.user.role !== "ADMIN_ROLE"){
//             return res.status(401).send({
//                 ok:false,
//                 message: "No tienes permisos para realizar esta accion"
//             })
//         }




// module.exports = {
//     getProduct,
//     createProduct,
//     deleteProduct,
//     updateProduct,
// }

