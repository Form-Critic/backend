const db = require('../dbConfig')

module.exports = {
    add,
    getAll,
    getById,
    update,
    remove,
    getCompletePost
}

async function add(post){
    const newPostId = await db('posts').insert(post).select('*').returning('*')
    console.log(newPostId[0])
    return getCompletePost(newPostId[0])
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
    console.log(id)
    const deletedPost = await getById({id:id})
    await db('posts').where({id:id}).del()
    return deletedPost
} 

function getCompletePost(id){
    return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .join('exercises as e', 'e.id', 'p.exercise_id')
    .where({'p.id':id})
    .select('u.username', 'u.avatar', 'u.name','p.*', 'e.name as exercise')
    // .select('p.*')
    .returning('u.username', 'u.avatar', 'u.name','p.*', 'e.name as exercise')
}
// function remove