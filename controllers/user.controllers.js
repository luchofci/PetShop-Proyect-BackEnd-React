const User = require('../models/user.model')

async function getUser(req, res){
    try{
        const users = await User.find()

        res.send(users)
    }
    catch(error){
        console.log(error)
    }
}





function hellowController (req, res){

    res.send('Hola mundo desde User Controller')
}

function createUser(req, res){
    res.send('POST nuevo usuario')
}


function deleteUser (req, res){
    res.send('DELETE usuario')
}

function updateUser (req, res){
    res.send('UPDATE usuario')
}

module.exports = {
    // hellowController,
    createUser,
    getUser,
    deleteUser,
    updateUser,
}

