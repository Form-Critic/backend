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
    //for the grid view!!
    return db('posts as p')
    .join('exercises as e', 'p.exercise_id', 'e.id')
    .select('p.title', 'e.name','p.video_link', 'p.up_vote', 'p.down_vote').returning('title')
}

async function update(id, post){
    
    const updated = await db('posts').update(post).where(id).select('*').returning('*')
    //returns obj in list
    return updated? getById(id) : 0
}

function getById(id){
    return db('posts').where(id).select('*').returning('*')
}

async function remove(id){
    const deletedPost = await getById(id)
    await db('posts').where({id:id}).del()
    return deletedPost
} 

// function remove