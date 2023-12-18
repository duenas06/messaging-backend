import { Model } from 'objection';
declare class UserModel extends Model {
    static get tableName(): string;
}
export default UserModel;
