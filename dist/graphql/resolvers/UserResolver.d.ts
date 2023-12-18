import UserModel from '../models/UserModel';
import IUser from '../../constants/interfaces/IUser.interface';
declare const UserResolver: () => {
    Query: {
        getUserById: (_: any, args: any) => Promise<{
            status: string;
            message: string;
            data: UserModel;
        } | {
            status: string;
            message: string;
            data: null;
        }>;
    };
    Mutation: {
        postNewUser: (_: any, args: any, conteValue: IUser) => Promise<{
            status: string;
            message: string;
            data: UserModel | null;
        }>;
    };
};
export default UserResolver;
