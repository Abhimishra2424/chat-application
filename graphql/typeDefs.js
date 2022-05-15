const { gql } = require("apollo-server");

module.exports = gql`
  type Users {
    username: String!
    email: String!
  }

  type Query {
    getUsers: [Users]!
  }
`;
