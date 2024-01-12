const User = require('../models/user.model')


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



// function hellowController(req, res) {

//     res.send('Hola mundo desde User Controller')
// }



//Crear usuario Nuevo

async function createUser(req, res) {

    try {

        const user = new User(req.body);


        console.log(user);

        await user.save()

        res.send('POST nuevo usuario')

    } catch (error) {
        res.send(error)
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

module.exports = {
    // hellowController,
    createUser,
    getUser,
    deleteUser,
    updateUser,
}

