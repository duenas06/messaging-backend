import { gql } from 'graphql-modules';

const User = gql(`

  scalar Date

  input PostUserInput {
    userId: String
    profileUrl: String
    nickname: String
    deleted: Boolean
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
    userId: String
    profileUrl: String
    nickname: String
    deleted: Boolean
    createdDate: Date
  }


  type Mutation {
    postNewUser(input: PostUserInput): PostUserResponse
  }

  type Query {  
    getUserById(input: GetUserByIdInput): GetUserResponse
  }
`);

export default User;
