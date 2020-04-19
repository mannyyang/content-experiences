const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const constants = require('./constants');

const initialiseData = require('./initial-data');

const TodoSchema = require('./lists/Todo.js');
const UserSchema = require('./lists/User.js');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = 'content-experiences';
const adapterConfig = {
  mongoUri: 'mongodb://root:Ges9ZFwHg68ChbKI@mdb-0-shard-00-00-vppsx.mongodb.net:27017,mdb-0-shard-00-01-vppsx.mongodb.net:27017,mdb-0-shard-00-02-vppsx.mongodb.net:27017/contentexperiences?ssl=true&replicaSet=mdb-0-shard-0&authSource=admin&retryWrites=true&w=majority'
};

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  onConnect: initialiseData,
});

keystone.createList('Todo', TodoSchema);
keystone.createList('User', UserSchema);

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
  ],
};
