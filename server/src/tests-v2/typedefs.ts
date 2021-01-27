import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    profile_picture: String
    owned_routes: [Route]
    saved_routes: [Route]
  }

  type Route {
      _id: ID!
    name: String!
    grade: String!
    author: User!
    public: Boolean!
    lat: String!
    lng: String!
    type: String!
    picture: String
    description: String
  }

  type Query {
    routes(author: ID public: Boolean): [Route]!
    route(_id: ID!): Route
    user(_id: ID!): User
  }

  type Mutation {
    deleteUser(id: ID!): Boolean
  }
`;
