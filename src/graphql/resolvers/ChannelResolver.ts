import IChannel from '../../constants/interfaces/IChannel.interface';
import { parseData, TimeZoneDate } from '../../services/generic';
import { ChannelModel } from '../models';

const ChannelResolver = () => ({
  Query: {
    getChannelById: async (_: any, args: any) => {
      try {
        const result = await ChannelModel.query().where({ id: args.input.id });
        return {
          status: result[0] !== null ? 'success' : 'failed',
          message: result[0] !== null ? 'Channel details retrieved.' : 'No Channel details retrieved.',
          data: result[0],
        };
      } catch (e: any) {
        return {
          status: 'failed',
          message: 'Sorry Channel cannot be retrieved, unknown error.',
          data: null,
        };
      }
    },
  },
  Mutation: {
    postNewChannel: async (_: any, args: any, conteValue: IChannel) => {
      var result = null;
      var status = 'success';
      var message = 'Sorry Channel cannot be created, Channel already existed.';
      console.log(args?.input);

      try {
        const dataExisted = await ChannelModel.query().where({
          channelUrl: args?.input.channelUrl,
        });

        if (dataExisted.length === 0) {
          result = await ChannelModel.query().insert({
            createdBy: args?.input.createdBy,
            chatmates: args?.input.chatmates,
            channelUrl: args?.input.channelUrl,
            totalMessages: args?.input.totalMessages,
            deleted: false,
            createdDate: TimeZoneDate('LLL'),
          });

          message = 'New channel was successfully created';
        } else {
          result = await ChannelModel.query()
            .update({
              ...dataExisted[0],
              createdBy: args?.input.createdBy,
              chatmates: args?.input.chatmates,
              channelUrl: args?.input.channelUrl,
              totalMessages: args?.input.totalMessages,
              deleted: args?.input.deleted,
            })
            .where({ channelUrl: args?.input.channelUrl });
          message = 'channel was successfully updated';
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
export default ChannelResolver;
