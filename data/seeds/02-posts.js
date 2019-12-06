
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, title:'help me', description:'this is me trying to do squat', video_link:'https://www.youtube.com/watch?v=SHgQeBk7zIs', exercise_id:1, user_id:1},
        {id: 2, title:'is my form ok', description:'this is me trying to do benchpress', video_link:'https://www.youtube.com/watch?v=vthMCtgVtFw', exercise_id:2, user_id:2},
        {id: 3, title:'my back back arcs', description:'this is me trying to do deadlift', video_link:'https://www.youtube.com/watch?v=r4MzxtBKyNE', exercise_id:3, user_id:2}
      ]);
    });
};
