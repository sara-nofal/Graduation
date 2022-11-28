const express = require('express')

const {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    getBySignin,
    //forgetPass
} = require('../controllers/userControllers')

const router = express.Router()

//GET All Users
router.get('/', getUsers)

//GET a single user
router.get('/:id', getUser)

//GET by query
router.post('/signin', getBySignin)

//Forgot password
//router.post('/forgotPass', forgetPass)

//POST a new user (create one)
router.post('/', createUser)

//DELETE a user
router.delete('/:id', deleteUser)

//UPDATE a user
router.patch('/:id', updateUser)
module.exports = router