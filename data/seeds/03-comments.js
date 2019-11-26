
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('post_comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('post_comments').insert([
        {id: 1, comment: 'It looks like your glutes and hamstrings are tight. This will prevent you from hitting full range in motion. Message me!', post_id:1, user_id:1},
        {id: 2, comment: 'Thanks, that was kinda what I was thinking... Will do!', post_id:1, user_id:2}
      ]);
    });
};
