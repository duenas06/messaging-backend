import { parseData, TimeZoneDate } from '../../services/generic';
import UserModel from '../models/UserModel';
import IUser from '../../constants/interfaces/IUser.interface';

const UserResolver = () => ({
  Query: {
    getUserById: async (_: any, args: any) => {
      try {
        const result = await UserModel.query().where({ id: args.input.id });
        return {
          status: result[0] !== null ? 'success' : 'failed',
          message: result[0] !== null ? 'User details retrieved.' : 'No User details retrieved.',
          data: result[0],
        };
      } catch (e: any) {
        return {
          status: 'failed',
          message: 'Sorry User cannot be retrieved, unknown error.',
          data: null,
        };
      }
    },
  },
  Mutation: {
    postNewUser: async (_: any, args: any, conteValue: IUser) => {
      var result = null;
      var status = 'success';
      var message = 'Sorry user cannot be created, user already existed.';
      console.log(args?.input);
      try {
        const dataExisted = await UserModel.query().where({
          userId: args?.input.userId,
        });

        if (dataExisted.length === 0) {
          // @ts-ignore
          result = await UserModel.query().insert({
            // @ts-ignore
            userId: args?.input.userId,
            nickname: args?.input.nickname,
            profileUrl: args?.input.profileUrl,
            deleted: false,
            createdDate: TimeZoneDate('LLL'),
          });

          message = 'New user was successfully created';
        } else {
          result = await UserModel.query()
            .update({
              ...dataExisted[0],
              userId: args.input.userId,
              nickname: args?.input.nickname,
              profileUrl: args?.input.profileUrl,
              deleted: args?.input.deleted,
            })
            .where({ userId: args.input.userId });

          message = 'user was successfully updated';
        }

        return {
          status: status,
          message: message,
          data: result,
        };
      } catch (e: any) {
        return {
          status: 'failed',
          message: 'Sorry user cannot be created, unknown error.',
          data: null,
        };
      }
    },
  },
});

export default UserResolver;
