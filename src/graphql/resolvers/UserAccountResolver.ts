import { logger } from '../../services/logger.service';
import { UserModel } from '../models';

export const getUserInfo = async (id: number) => {
  try {
    const model = UserModel;
    return await model.query().select('*').findById(id);
  } catch (e: any) {
    logger('getUserInfo', 'getUserInfo', e.message);
    return null;
  }
};
