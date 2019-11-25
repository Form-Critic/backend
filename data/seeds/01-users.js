const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Jordan', username:'jordana', email:'jordan@gmail.com', password:bcrypt.hashSync('1234',8)},
        {id: 2, name: 'Uzias', username:'uziasr', email:'uzias@gmail.com', password:bcrypt.hashSync('1234',8)}    
      ]);
    });
};
