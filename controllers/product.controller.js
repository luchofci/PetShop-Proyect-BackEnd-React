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

        const limit = parseInt(req.query.limit) || 3;
        const page = parseInt(req.query.page) || 0;




        const products =  await Product.find().populate("category", "name").limit(limit).skip(page * limit).collation({ locale:"es"}).sort({name: 1});
        // Este populate es para especificar que en las categorias que se buscan de cada producto, no te de el numero de ID, sino que aparte del ID, te de el nombre de el objeto de la categoa del schema y de ese objeto el name.
        // el metodo LIMIT, limita la cantidad de elementos a mostrar, por si tenemos una BD muy cargada, se muetren de X cantidad de elementos por pagina.
        // Metodo SKIP es para que X cantidad de elementos se las salte.
        // El SKIP se usa para pasar de pagina de productos, tocas la pagina 2, entonces te salta todos los productos de la pagina uno (dependiendo el limitie q setiaste), y te devuelve N cantidad segun el SKIP en la pagina 2.
        //SORT es un metodo para ordenar alfabeticamente los elementos, PERO, ordena primero los de mayuscula y luego minuscula
        //COLLATION es para solucionar el tema de las mayusculas, y ordena indiferentemente.
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

async function deleteProduct(req, res) {
    try{




        const id = req.params.id;

        const product =  await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).send({
                ok:false,
                message:"Producto no encontrado"
            })
        }
        return res.status(200).send({
            ok:true,
            message:"El producto fue eliminado correctamente"
        })

    } catch (error) {
        consle.log(error)
        return res.status(500).send({
        ok: false,
        message: "Error al eliminar el producto"
        });
    }
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}