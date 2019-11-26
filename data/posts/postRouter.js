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

router.get('/:id', (req,res)=>{

    console.log('this needs to show up', req.decodedJwt)
    const id = req.params
    postDB.getById(id)
    .then(posts=>{
        res.status(200).json(...posts)//obj
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err:'something went wrong'})
    })
})

router.put('/:id', (req,res)=>{
    const id = req.params
    const body = req.body

    console.log('id', id)
    postDB.update(id,body)
    .then(updatedObj=>{
        res.status(201).json(...updatedObj)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router