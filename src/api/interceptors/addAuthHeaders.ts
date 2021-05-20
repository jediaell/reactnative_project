import { AxiosRequestConfig } from 'axios';
import { isEmpty } from 'lodash';

export interface IStorage {
  getToken(): Promise<Token | null>;
}

type CustomRequest = {
  authorization?: string;
};

const addAuthHeaders = async (
  config: AxiosRequestConfig,
  Storage: IStorage,
): Promise<AxiosRequestConfig & CustomRequest> => {
  const token: Token | null = await Storage.getToken();
  const accessToken: string | undefined = token?.accessToken;

  if (isEmpty(accessToken)) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
};

export default addAuthHeaders;
