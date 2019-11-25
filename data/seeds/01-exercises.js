
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('exercises').del()
    .then(function () {
      // Inserts seed entries
      return knex('exercises').insert([
        {id: 1, name: 'squat', description:'the best leg exercise', body_category:'legs'},
        {id: 2, name: 'benchpress', description:'the best chest exercises', body_category:'chest'},
        {id: 3, name: 'deadlift', description:'the best posterior chain builder', body_category:'legs'},
        {id: 4, name: 'barbell row', description:'A great back builder', body_category:'back'}
      ]);
    });
};
