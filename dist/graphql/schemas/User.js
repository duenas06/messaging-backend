"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_modules_1 = require("graphql-modules");
const User = (0, graphql_modules_1.gql)(`

  scalar Date

  input PostUserInput {
    userId: String!
    profileUrl: String!
    nickname: String
  }

  input GetUserByIdInput {
    id: Int
  }

  type PostUserResponse {
    status: String
    message: String
    data: UserDetails
  }

  type GetUserResponse {
    status: String
    message: String
    data: UserDetails
  }

  type UserDetails {
    id: Int
    userId: String!
    profileUrl: String!
    nickname: String
  }


  type Mutation {
    postNewUser(input: PostUserInput): PostUserResponse
  }

  type Query {  
    getUserById(input: GetUserByIdInput): GetUserResponse
  }
`);
exports.default = User;
