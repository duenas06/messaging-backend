import { mergeTypeDefs } from '@graphql-tools/merge';
import User from './User';
import Channel from './Channel';

const unProtectedDef = mergeTypeDefs([User, Channel]);

const protectedDef = mergeTypeDefs([User]);

const schemas = {
  unProtectedDef,
  protectedDef,
};

export default schemas;
