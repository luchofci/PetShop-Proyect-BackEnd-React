const User = require('../models/user.model')


//Obtener usuarios
async function getUser(req, res) {
    try {
        const users = await User.find()

        res.send({
            users,
            message: 'Usuarios obtenidos correctamente',
            ok: true
        })
    }
    catch (error) {
        console.log(error);
        res.send({
            message: 'Error al obtener usuarios',
            ok: false
        })
    }
}

// function hellowController(req, res) {

//     res.send('Hola mundo desde User Controller')
// }



//Crear usuario Nuevo

async function createUser(req, res) {

    try{
        
        const user = new User(req.body);

    
        console.log(user);
    
        await user.save()

        res.send('POST nuevo usuario')

    }catch(error){
        res.send(error)
    }



}



//Borrar usuarios
async function deleteUser(req, res) {

    try{
        
        console.log(req.params.idUser)

        const id = req.params.idUser

        const userDeleted = await User.findByIdAndDelete(id)

        res.send({
            ok:true,
            message: "Usuario Borrado correctamente",
            user: userDeleted
        })

    }catch(error){
        console.log(error)
        res.send('No se pudo borrar el usuario')
    }


}








function updateUser(req, res) {
    res.send('UPDATE usuario')
}

module.exports = {
    // hellowController,
    createUser,
    getUser,
    deleteUser,
    updateUser,
}

