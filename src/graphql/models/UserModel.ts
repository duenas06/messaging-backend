import { Model } from 'objection';

class UserModel extends Model {
  static get tableName() {
    return 'User';
  }
}

export default UserModel;
