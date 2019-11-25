const db = require('../dbConfig')

module.exports = {
    add,
    getAll,
    getById,
    update,
    remove
}

function add(post){
    return db('posts').insert(post).select('*').returning('*')
}

function getAll(){
    return db('posts').select('title').returning('title')
}

function update(id, post){
    return db('posts').update(post).where(id).select('*').returning('*')
}

function getById(id){
    return db('posts').where({id:id}).select('*').returning('*')
}

async function remove(id){
    const deletedPost = await getById(id)
    await db('posts').where({id:id}).del()
    return deletedPost
} 

// function remove