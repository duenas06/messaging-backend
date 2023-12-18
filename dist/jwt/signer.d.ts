import IUser from '../constants/interfaces/IUser.interface';
declare const signJWT: (object: IUser) => Promise<string>;
export default signJWT;
