const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NextApp } = require('@keystonejs/app-next');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const TodoSchema = require('./lists/Todo.js');
const UserSchema = require('./lists/User.js');
const FlipCardSchema = require('./lists/FlipCard.js');

const PROJECT_NAME = 'content-experiences';
const adapterConfig = {
  mongoUri: 'mongodb://root:Ges9ZFwHg68ChbKI@mdb-0-shard-00-00-vppsx.mongodb.net:27017,mdb-0-shard-00-01-vppsx.mongodb.net:27017,mdb-0-shard-00-02-vppsx.mongodb.net:27017/contentexperiences?ssl=true&replicaSet=mdb-0-shard-0&authSource=admin&retryWrites=true&w=majority',
};

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  // When the project was first built, database hydration was needed for users.
  // onConnect: initialiseData,
});

// Initiate all schemas here
keystone.createList('User', UserSchema);
keystone.createList('Todo', TodoSchema);
keystone.createList('FlipCard', FlipCardSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: false,
      authStrategy,
    }),
    new NextApp({ dir: './client' }),
  ],
};
