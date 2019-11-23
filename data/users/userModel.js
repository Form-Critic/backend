const db = require('../dbConfig')

module.exports = {
    add,
    getById,
    remove,
    update,
    findBy
}

async function add(user){
    const id = await db('users').insert(user).select('id').returning('id')
    console.log('this is id', id)
    return getById(id[0])
} 

function getById(id){
    return db('users').where({id:id}).returning('*')
}

function findBy(user){
    //selects by unique field name
    return db('users').where(user).select('*').returning('*')
}

async function remove(id){
    const deletedUser = await getById(id)
    await db('users').where({id:id}).del()
    return deletedUser
}
function update(id, user){
    return db('users').update(user).where(id).select('*').returning('*')
}