const router = require('express').Router()
const postDB = require('./postModel')
const commentsDB = require('../post_comments/postCommentModel')
const restricted = require('../auth/restricted-middleware')

router.get('/', (req,res)=>{
    console.log('this needs to show up', req.decodedJwt)    
    postDB.getAll()
    .then(posts=>{
        res.status(200).json(posts)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err:'something went wrong'})
    })
})

router.get('/:id/all', restricted, (req,res)=>{
    const id = req.params.id
    console.log('this is the id I need, ' ,id)
    postDB.getByUserId(id)
    .then(myPosts=>res.status(200).json(myPosts))
    .catch(err=>{
        console.log(err)
        res.status(500).json({err:'something went wrong'})
    })
})

router.get('/:id', restricted,(req,res)=>{

    console.log('this needs to show up', req.decodedJwt)
    const id = req.params.id
    postDB.getCompletePost(id)
    .then(posts=>{
        res.status(200).json(...posts)//obj
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err:'something went wrong'})
    })
})

router.put('/:id', restricted, isUser,(req,res)=>{
    //returns object
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

router.post('/', restricted,(req,res)=>{
    const user_id = req.decodedJwt.sub
    const body = req.body
    // FRONT NEEDS TO SEND IN EXERCISE AS ID
    postDB.add({user_id:user_id,...body})
    .then(newPost=>{
        res.status(201).json(...newPost)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', restricted, isUser, (req,res)=>{
    //if successful, the deleted object will return
    //middleware isUser checks if post exist and if it belongs to the user
    const postId = req.params.id
    postDB.remove(postId)
    .then(deletedPost=>{
        console.log(deletedPost)
        res.status(200).json(...deletedPost)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(...err)
    })
})

// for comments below here

router.get('/:id/comments', (req,res)=>{
    const post_id = req.params.id
    console.log(post_id)
    commentsDB.getById(post_id)
    .then(comment=>{
        res.status(200).json(comment)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/:id/comments', restricted, (req,res)=>{
    const post_id = req.params.id
    const user_id = req.decodedJwt.sub
    const body = req.body
    console.log(post_id)
    commentsDB.add({post_id:post_id, user_id:user_id, ...body})
    .then(comment=>{
        res.status(200).json(...comment)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/:post_id/comments/:id', restricted, isUserComment, (req, res)=>{
    const commentID = {id:req.params.id}
    const comment = req.body
    commentsDB.update(commentID, req.body)
    .then(updated=>{
        console.log(updated)
        res.status(200).json(...updated)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/comments/:id', restricted, isUserComment, (req,res)=>{
    const commentID = {id:req.params.id} 
    commentsDB.remove(commentID)
    .then(deletedComment=>{
        console.log(deletedComment)
        res.status(200).json(...deletedComment)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

//middleware

async function isUser(req, res, next){
    const postId = req.params
    const postInfo = await postDB.getById(postId)

    return(!postInfo[0])?res.status(400).json({err:"That post does not exist"}):
    (req.decodedJwt.sub===postInfo[0].user_id)?next():res.status(404).json({err:"This is not yours!"})
}

async function isUserComment(req, res, next){
    const commentId = req.params.id
    const commentInfo = await commentsDB.getByCommentId(commentId)

    return(!commentInfo[0])?res.status(400).json({err:"That comment does not exist"}):
    (req.decodedJwt.sub===commentInfo[0].user_id)?next():res.status(404).json({err:"This is not yours!"})
}

module.exports = router 