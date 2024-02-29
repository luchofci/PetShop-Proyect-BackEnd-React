const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'alfabeta';


//Obtener usuarios
async function getUser(req, res) {
    try {
        const id = req.params.id; //Si no viene undefined.

        // Si recibo ID busco un usuario especifico
        if (id) {
            const user = await User.findById(id, { password: 0 }) // si pongo 0 no te da ese dato, si pongo 1, te da ese elemento.

            if (!user) {
                return res.status(404).send({
                    ok: false,
                    message: "No se encontro el usuario"
                })
            }

            // user.password = undefined; Esto no es necesario dado que arriba en un objeto pusimos password 0.

            return res.send({
                ok: true,
                user,
                message: "Usuario encontraro",
            }) //mostrar error sin return // EL return es importante, xq no cortaria el IF si no esta.
        }

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 0;

        // ESTE PROMISE ALL ES PARA QUE CUANDO HAY MAS DE UNA PROIMERA, LAS REALICE AL MISMO TIEMPO, SINO POR EL AWAIT, NO SE REALISZA LA SEGUNIDA HASTA QUE NO SE COMPLETE LA PRIMERA. 
        const [total, users] = await Promise.all([

            User.countDocuments(), // total

            User.find().limit(limit).skip(page * limit).collation({ locale:"es"}).sort({name: 1}) .select({ password: 0, __v:0 }) //  users

        ])
        // aca abajo seria las mismas lineas pero sin el promise ALL
        // const users = await User.find().limit(limit).skip(page * limit).collation({ locale:"es"}).sort({name: 1}) .select({ password: 0, __v:0 })

        // const total = await User.countDocuments()

        if (!users.length) {
            return res.status(404).send({
                ok: false,
                message: "No se encontraron usuarios"
            })
        }


        //Devolvemos todos los usuarios
        res.send({
            users,
            message: 'Usuarios obtenidos correctamente',
            ok: true,
            total
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'No se pudo obtener los usuarios'
        })
    }
}



//Crear usuario Nuevo
async function createUser(req, res) {

    try {
        // Creamos nuevo usuario.-
        const user = new User(req.body);
        
        if(req.file?.filename){
            user.image = req.file.filename

        }
        //Encriptar la contrase;a // Estas 2 linas son iguales, como son asincronas, eso se lo das con el await, o poniendo hashSync
        // user.password = bcrypt.hashSync(user.password, saltRounds)
        user.password = await bcrypt.hash(user.password, saltRounds)

        //Guardamos el usuario
        const userSaved = await user.save()

        //Estas 2 lineas hacen lo mismo. Borramos la contrase;a del objetivo
        // delete userSaved.password
        userSaved.password = undefined

        console.log(userSaved),

            res.status(201).send({
                ok: true,
                message: 'Usuario creado Correctamente',
                user: userSaved,
            })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo crear el usuario"
        })
    }
}



//Borrar usuarios
async function deleteUser(req, res) {

    try {

        //Comprobar si la persona que desea borrar es un ADMIN?ROLE, si no es ADMIN non lo dejo continuar.
        if(req.user.role !== "ADMIN_ROLE"){
            return res.status(403).send({
                ok:false,
                message: "No tienes permisos para realizar esta accion"
            })
        }


        const id = req.params.idUser

        const userDeleted = await User.findByIdAndDelete(id)

        if(!userDeleted){
            return res.status(404).send({
                ok:false,
                message: "No se encontro el usuario"
            })
        }

        res.send({
            ok: true,
            message: "Usuario Borrado correctamente",
            user: userDeleted
        })

    } catch (error) {
        console.log(error)
        res.send('No se pudo borrar el usuario')
    }


}


async function updateUser(req, res) {

    try {
        if(req.user.role !== "ADMIN_ROLE") {
            return res.status(403).send({
                ok: false,
                message: "No tienes permisos para actualizar usuarios"
            })
        }
        
        
        const id = req.params.id
        const nuevosValoresBody = req.body

        if(!user){
            return res.status(404).send({
                ok:false,
                message:"Usuario no encontrado"
            })
        }


        const userUpdated = await User.findByIdAndUpdate(id, nuevosValoresBody, { new: true })

        res.send({
            ok: true,
            message: "Usuario actualizado correctamente",
            user: userUpdated
        })


    } catch (error) {
        console.log(error)
        res.send({
            ok: false,
            message: 'No se puedo actualizar el usuario'
        })
    }



}


async function login(req, res) {
    try {

        //Obtenemos del body el email y el password
        const { password, email } = req.body;
        // const password = req.body.password,
        // const email = req.body.email,
        //estas 2 linas es lo mismo que la linea de arriba.

        if (!password || !email) {
            return res.status(400).send({
                ok: false,
                message: "Faltan datos"
            })
        }

        const user = await User.findOne({ 
            email: email.toLowerCase() 
        })

        //Si no existe el usuario

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "Datos incorrectos"
            })
        }


        //Si existe el usuario, y la pass no es correcta, devuelve un error.
        const verifiedUser = await bcrypt.compare(password, user?.password)

        if (!verifiedUser) {
            return res.status(404).send({
                ok: false,
                message: "Datos incorrectos"
            })
        }

        //Realizar el login y devolver respuesta correcta.

        user.password = undefined; //Esto es importante para que no se muestre el password hasheado/

        //Generar un token para el usuario de tal modo que sus datos originales no puedan ser manipulados

        var token = jwt.sign({ 
            user 
        }, secret, { 
            expiresIn: "1h" 
        });

        res.send({
            ok: true,
            message: "Login correcto",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: "No se pudo hacer el login"
        })
    }
}


async function searchUser(req, res){
    try{
        const search = new RegExp(req.params.search, "i");  // Esto sera un nombre, completo o incompleto, depende lo q ingrese el usuario
        // La expresion de I, no es sensitivo a la mayusculo o minuscula.
        // Regex es una expresion regular.-

        //Aca tenemos busqueda, pero bajo 2 criterios
        // El $OR busca uno o el otro, o ambos, pero si pongo $AND buscara que AMBOS criterios esten.
        const users = await User.find({
            $or:[
                {name: search}, // Expresion regular
                {email: search},
            ]
        })

        // $and: [
        //     {age: {$gte: 18}},
        //     {
        //         $or: [
        //             {name: search}, 
        //             {email: search},
        //         ],
        //     },
        // ]
        // }),

        /*  $gt - greater than
            $lt - Lesser than
            $gte - greater than or equal
            $gte - Lesser than or equal
        */





        console.log(users);
        return res.send({
            ok: true,
            message: "Usuarios encontrados",
            users
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'No se pudo buscar el usuario'
        })
    }
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser,
    login,
    searchUser,
}

// OPERADOR DE ENCADENAMIENTO OPCIONAL (channing operator)

// 1 OPCION
// if(user){
//     if(user.profile){
//         if(user.profile.name){
//             console.log(user.profile.name)
//         }
//     }
// }

// 2 OPCION
// if(user?.profile?.name){
//     console.log(user.profile.name)
// }

// 3 OPCION
// if(user && user.profile && user.profile.name)