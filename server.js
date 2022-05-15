const { ApolloServer } = require("apollo-server");

const { sequelize } = require("./models");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: (ctx) => ctx,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.log(err));
});
