
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl=>{
      tbl.increments()
      tbl.string('name', 126).notNullable()
      tbl.string('username', 255).notNullable().unique()
      tbl.string('email', 255).notNullable().unique()
      tbl.string('password', 126).notNullable()
      tbl.integer('post_count').notNullable().default(0)
      tbl.binary('avatar').default('https://i.stack.imgur.com/IHLNO.jpg') 
  })
  .createTable('messages', tbl=>{ // message system
    tbl.increments()
    tbl.integer('user_one')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .unsigned()
    .notNullable()
    tbl.integer('user_two')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .unsigned()
    .notNullable()
  })
  .createTable('message_conversation', tbl=>{
    tbl.increments()
    tbl.integer('message_id')
    .references('id')
    .inTable('messages')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .unsigned()
    .notNullable()
    tbl.integer('user_id')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .unsigned()
    .notNullable()
    tbl.string('body', 255)
    tbl.timestamp('date').notNullable().defaultTo(knex.fn.now())    
  })
  .createTable('exercises', tbl=>{
    tbl.increments()
    tbl.string('name',126).notNullable()
    tbl.string('body_category',126).notNullable()
    tbl.string('video_link',126)
    tbl.string('description',126).notNullable()
  })
  .createTable('posts', tbl=>{
    tbl.increments()
    tbl.string('title', 126).notNullable()
    tbl.string('description', 255).notNullable()
    tbl.string('video_link', 126).notNullable()
    tbl.integer('exercise_id').notNullable()
    .references('id')
    .inTable('exercises')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .unsigned()
    .notNullable()
    tbl.integer('user_id').notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .unsigned()
    .notNullable()
    tbl.integer('up_vote').notNullable().default(0)
    tbl.integer('down_vote').notNullable().default(0)
    tbl.timestamp('date').notNullable().defaultTo(knex.fn.now())
  })
  .createTable('post_comments', tbl=>{
      tbl.increments()
      tbl.string('comment',255).notNullable()
      tbl.integer('post_id')
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .unsigned()
      .notNullable()
      tbl.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .unsigned()
      .notNullable()
      tbl.integer('up_vote').notNullable().default(0)
      tbl.integer('down_vote').notNullable().default(0)
      tbl.timestamp('date').notNullable().defaultTo(knex.fn.now())

    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('post_comments')
  .dropTableIfExists('posts')
  .dropTableIfExists('message_conversation')
  .dropTableIfExists('exercises')
  .dropTableIfExists('messages')
  .dropTableIfExists('users')
};
