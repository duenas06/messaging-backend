import Scalars from '../scalars';
import ChannelResolver from './ChannelResolver';
import UserResolver from './UserResolver';

const unProtectedResolvers = [UserResolver(), ChannelResolver()];

const protectedResolvers = [UserResolver()];

const resolvers = {
  unProtectedResolvers,
  protectedResolvers,
};

export default resolvers;
