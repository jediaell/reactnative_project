import { mocked } from 'ts-jest/utils';
import request from '../request';
import SecurityApi from '../security/security.api';

jest.mock('../request', () => ({
  post: jest.fn(),
}));

const api = SecurityApi;

describe('Api: Security', () => {
  beforeEach(() => {
    mocked(request.post).mockClear();
  });

  test('should call login when request is success', async () => {
    // should
    mocked(request.post).mockImplementation(() => {
      return Promise.resolve({ name: 'builders' });
    });

    // when
    try {
      const response = await api.login({ cpf: '123', password: 'pass' });
      expect(response).toEqual({ name: 'builders' });
    } catch {}

    expect(mocked(request.post).mock.calls.length).toBe(1);
  });

  test('should call login when request is fail', async () => {
    // should
    mocked(request.post).mockRejectedValue({});

    // when
    try {
      await api.login({ cpf: '123', password: 'pass' });
    } catch (error) {
      expect(error).toEqual({
        code: 0,
        message: 'Erro inesperado. Verifique sua internet e tente novamente.',
      });
    }

    expect(mocked(request.post).mock.calls.length).toBe(1);
  });
});
