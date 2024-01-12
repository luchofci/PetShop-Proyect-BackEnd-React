const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Obtener usuarios
async function getUser(req, res) {
    try {
        const id = req.params.id; //Si no viene undefined.
        if (id) {
            const user = await User.findById(id, {password: 0}) // si pongo 0 no te da ese dato, si pongo 1, te da ese elemento.

            if (!user.length) {
                return res.status(404).send({
                    ok: false,
                    message: "No se encontro el usuario"
                })
            }

            // user.password = undefined; Esto no es necesario dado que arriba en un objeto pusimos password 0.

            return res.send({
                ok:true,
                user,
                message:"Usuario encontraro",
            }) //mostrar error sin return // EL return es importante, xq no cortaria el IF si no esta.
        }

        const users = await User.find()

        if(!users.length){
            return res.status(404).send({
                ok:false,
                message: "No se encontraron usuarios"
            })
        }


        //Devolvemos todos los usuarios
        res.send({
            users,
            message: 'Usuarios obtenidos correctamente',
            ok: true
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

        const user = new User(req.body);

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
            message:'Usuario creado Correctamente',
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

        console.log(req.params.idUser)

        const id = req.params.idUser

        const userDeleted = await User.findByIdAndDelete(id)

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

    console.log(req.query)

    try {

        const id = req.params.id
        const nuevosValoresBody = req.body
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


async function login(req, res){
    try{

        //Obtenemos del body el email y el password
        // const password = req.body.password,
        // const email = req.body.email,
        //estas 2 linas de arriba es lo mismo que la linea de abajo.
        const {password, email} =  req.body;

        const user = await User.findOne({email : email.toLowerCase()})

        //Si no existe el usuario
        if(!user){
            return res.status(404).send({
                ok:false,
                message: "No existe el usuario"
            })
        }

        //Si existe el usuario, comparamos la contrase;a
        const verifiedUser = bcrypt.compare(password, user.password)


        //Devolvemos un error si la contrase;a no es correcta
        //Realizar el login y devolver respuesta correcta.


        res.send({
            ok:true,
            message:"Login correcto"
        })

    }catch (error){
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "No se pudo hacer el login"
        })
    }
}


module.exports = {
    // hellowController,
    createUser,
    getUser,
    deleteUser,
    updateUser,
    login,
}

