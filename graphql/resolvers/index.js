const userResolvers = require("./users");
const messageResolvers = require("./messages");

module.exports = {
  Message: {
    createdAt: (parent) => {
      return parent.createdAt.toISOString();
    },
  },
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
  },
  Subscription: {
    ...messageResolvers.Subscription,
  },
};
