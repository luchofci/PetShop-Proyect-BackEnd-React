const User = require('../models/user.model')

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





function hellowController(req, res) {

    res.send('Hola mundo desde User Controller')
}



function createUser(req, res) {

    const user = req.body;

    console.log(users)

    res.send("Post user")



}







function deleteUser(req, res) {
    res.send('DELETE usuario')
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

