const Product = require('../models/product.model');





async function getProduct(req, res){
    try{
        const id = req.params.id; //Si no viene undefined.
        if (id) {
            const product = await Product.findById(id) 

            if (!product) {
                return res.status(404).send({
                    ok: false,
                    message: "No se encontro el producto"
                })
            }

            return res.status(200).send({
                ok: true,
                product,
                message: "Producto encontraro",
            }) //mostrar error sin return // EL return es importante, xq no cortaria el IF si no esta.
        }
        const products =  await Product.find().populate("category", "name")
        // Este populate es para especificar que en las categorias que se buscan de cada producto, no te de el numero de ID, sino que aparte del ID, te de el nombre de el objeto de la categoa del schema y de ese objeto el name.

        return res.status(200).send({
            ok: true,
            message: "Productos obtenenidos Correctamente",
            products
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al obtener los productos"
        })
    }
}

async function createProduct(req, res){
    try{

        const product = new Product(req.body);

        //Guardamos el producto
        const productDB = await product.save()

        return res.status(200).send({
                            ok: true,
                            message: 'Producto creado Correctamente',
                            product: productDB,
                        })



    }catch(error){
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al crear los productos"
        })
    }
}

async function updateProduct(req, res) {

    try{
        // Obtenemos el ID para saber a quien tenemos que actualizar
    const id = req.params.id;
        // Obtenemos los valores nuevos o actualizados.
    const body = req.body;

    const product = await Product.findById(id);

    if(!product){
        return res.status(404).send({
            ok:false,
            message:"Producto no encontrado"
        })
    }



    //Updateamos el producto
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true })
    // Ese new true es para que te devuelva el producto actualizado

    return res.status(200).send({
        ok: true,
        message: "Productos actualizado correctamente",
        product: updatedProduct,
    })

} catch (error) {
    console.log(error)
    res.status(500).send({
        ok: false,
        message: 'No se puedo actualizar el producto'
    })
}
}


module.exports = {
    getProduct,
    createProduct,
    updateProduct,
}