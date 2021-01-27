"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type Query {
    routes(author: ID public: Boolean): [Route]!
    route(_id: ID!): Route
    user(_id: ID!): User
  }
`;