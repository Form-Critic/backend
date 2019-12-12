const router = require('express').Router()
const userDB = require('./userModel')
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted, (req,res)=>{
    const user_id = req.decodedJwt.sub
    userDB.getById(user_id)
    .then(current_user=>{
        console.log('line 9 ', current_user)
        res.status(201).json(...current_user)
    })
    .catch(err=>{
        console.log('error on line 13 ', err)
        res.status(500).json(err)
    })
})

module.exports = router 