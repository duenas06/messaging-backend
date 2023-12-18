import { gql } from 'graphql-modules';

const Channel = gql(`

  scalar Date

  input PostChannelInput {
    createdBy: String
    chatmates: [String]
    channelUrl: String!
    deleted: Boolean
    totalMessages: Int
  }

  input GetChannelByIdInput {
    id: Int
  }

  type PostChannelResponse {
    status: String
    message: String
    data: ChannelDetails
  }

  type GetChannelResponse {
    status: String
    message: String
    data: ChannelDetails
  }

  type ChannelDetails {
    id: Int
    createdBy: String
    chatmates: [String]
    channelUrl: String
    deleted: Boolean
    createdDate: Date
    totalMessages: Int
  }


  type Mutation {
    postNewChannel(input: PostChannelInput): PostChannelResponse
  }

  type Query {  
    getChannelById(input: GetChannelByIdInput): GetChannelResponse
  }
`);

export default Channel;
