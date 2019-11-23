const router = require('express').Router()
const userDB = require('./userModel')
const restricted = require('../auth/restricted-middleware')

router.post('/register', restricted, (req,res)=>{
    const account = req.body
    userDB.add(id)
    .then(newUser=>{
        console.log('line 9 ', newUser)
        res.status(201).json(newUser)
    })
    .catch(err=>{
        console.log('error on line 13 ', err)
        res.status(500).json(err)
    })
})
