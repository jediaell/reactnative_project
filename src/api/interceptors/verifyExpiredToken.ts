import { AxiosError } from 'axios';
import { ExpiredSessionError } from '~/utils';

export interface INavigation {
  logout(): void;
}

interface IVerifyExpiredToken {
  error: AxiosError;
  Navigation: INavigation;
  showFeedback(message: string): void;
}

type ResponseError = ExpiredSessionError | AxiosError;

type StatusError = number | undefined;

const verifyExpiredToken = ({
  error,
  Navigation,
  showFeedback,
}: IVerifyExpiredToken): ResponseError => {
  const expiredSessionError = 403;
  const statusError: StatusError = error?.response?.status;

  if (expiredSessionError === statusError) {
    Navigation.logout();

    const { message } = error?.response?.data;
    showFeedback(message);

    throw new ExpiredSessionError();
  }

  throw error;
};

export default verifyExpiredToken;
