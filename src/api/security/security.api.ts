import { ResponseError } from '~/utils';
import request from '../request';

export default class SecurityApi {
  static login = async ({ cpf, password }: Credentials): Promise<any> => {
    try {
      const { data } = await request.post('/security/login', {
        username: cpf,
        password,
      });

      return data;
    } catch (error) {
      throw new ResponseError(error);
    }
  };
}
