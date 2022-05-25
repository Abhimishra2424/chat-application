const { ApolloServer } = require("apollo-server");

require("dotenv").config();

const { sequelize } = require("./models");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const contextMiddleware = require("./util/contextMiddleware");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: contextMiddleware, // THIS IS ACCESSIBLE FROM THE CLIENT like req in express
  subscriptions: { path: "/" },
});

// The `listen` method launches a web server.
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀  subscriptions ready at ${subscriptionsUrl}`);
  sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.log(err));
});
