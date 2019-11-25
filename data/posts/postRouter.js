const router = require('express').Router()
const postDB = require('./postModel')

router.get('/', (req,res)=>{
    console.log(req.decodedJwt)
    postDB.getAll()
    .then(posts=>{
        res.status(200).json(posts)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err:'something went wrong'})
    })
})

module.exports = router