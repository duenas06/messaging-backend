import { Model } from 'objection';

class ChannelModel extends Model {
  static get tableName() {
    return 'Channel';
  }
}

export default ChannelModel;
