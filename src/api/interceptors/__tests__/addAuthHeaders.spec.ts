import { AxiosRequestConfig } from 'axios';
import addAuthHeaders, { IStorage } from '../addAuthHeaders';

type MakeMoker = {
  tokenValue: string;
  config: AxiosRequestConfig;
  StorageMock: IStorage;
};

const makeMocks = (): MakeMoker => {
  const tokenValue = 'any_token_value';

  const config: AxiosRequestConfig = {
    url: 'any_url',
    method: 'GET',
    headers: {},
  };

  class StorageMock {
    static async getToken(): Promise<Token | null> {
      return Promise.resolve({
        accessToken: tokenValue,
      });
    }
  }

  return { config, tokenValue, StorageMock };
};

describe('Interceptor: addAuthHeaders', () => {
  test('when token exist and has `accessToken` then return headers with authorization', async () => {
    // when
    const { config, tokenValue, StorageMock } = makeMocks();
    const response = await addAuthHeaders(config, StorageMock);

    // then
    expect(response).toEqual({
      ...config,
      headers: {
        ...config.headers,
        authorization: `Bearer ${tokenValue}`,
      },
    });
  });

  test("when token exist and hasn't `accessToken` then return default config", async () => {
    // should
    const { config, StorageMock } = makeMocks();

    // when
    StorageMock.getToken = jest.fn().mockResolvedValue({
      session: {
        logged: true,
        sessionStart: 'any_value',
      },
    });

    const response = await addAuthHeaders(config, StorageMock);

    // then
    expect(response).toEqual(config);
  });

  test('when token not exist then return default config', async () => {
    // should
    const { config, StorageMock } = makeMocks();

    // when
    StorageMock.getToken = jest.fn().mockResolvedValue(null);
    const response = await addAuthHeaders(config, StorageMock);

    // then
    expect(response).toEqual(config);
  });
});
