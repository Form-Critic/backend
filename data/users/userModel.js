const db = require('../dbConfig')

module.exports = {
    add,
    getById,
    remove,
    update,
    findBy
}

async function add(user){
    const id = await db('users').insert(user).select('id').returning('id')// returns id in array
    return findBy({id:id[0]}).returning('*')
} 

function getById(id){
    return db('users').where({id:id}).select('*').returning('*')
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