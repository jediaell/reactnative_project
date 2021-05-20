// import { mocked } from 'ts-jest/utils';
import axios from 'axios';
import ResponseError from '../ResponseError';

jest.mock('axios', () => ({
  get: jest.fn().mockRejectedValue(new Error('Async error')),
}));

describe('Entities: ResponseError', () => {
  test('when instance method then return default values', async () => {
    try {
      await axios.get('/fake-api');
    } catch (error) {
      const result = new ResponseError(error);

      expect(result.code).toEqual(0);
      expect(result.message).toEqual(
        'Erro inesperado. Verifique sua internet e tente novamente.',
      );
    }
  });

  test('when instance method then return default values', async () => {
    try {
      await axios.get('/fake-api');
    } catch (error) {
      const newError = {
        ...error,
        response: {
          status: 500,
          data: {
            message: 'Error message',
          },
        },
      };

      const result = new ResponseError(newError);

      expect(result.code).toEqual(500);
      expect(result.message).toEqual('Error message');
    }
  });
});
