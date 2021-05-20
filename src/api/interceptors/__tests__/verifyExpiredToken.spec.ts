import { AxiosError } from 'axios';
import verifyExpiredToken, { INavigation } from '../verifyExpiredToken';

type MakeMoker = {
  NavigationMock: INavigation;
  errorMock: AxiosError;
  showFeedbackMock(message: string): void;
  spyNavigationMockLogout: jest.SpyInstance<void>;
};

const makeMock = (isExpiredError = false): MakeMoker => {
  const errorMock: AxiosError = {
    name: 'any_name',
    message: 'any_message',
    config: {},
    response: {
      data: {
        message: 'any_response_data_message',
      },
      status: isExpiredError ? 403 : 400,
      statusText: 'any_status',
      headers: 'any_header',
      config: {},
    },
    isAxiosError: true,
    toJSON: jest.fn(),
  };

  class NavigationMock {
    static logout(): void {}
  }

  const showFeedbackMock = jest.fn((message) => message);

  const spyNavigationMockLogout = jest.spyOn(NavigationMock, 'logout');

  return {
    errorMock,
    showFeedbackMock,
    NavigationMock,
    spyNavigationMockLogout,
  };
};

describe('Interceptor: verifyExpiredToken', () => {
  test('when token expired then return `ExpiredSessionError` error', () => {
    // should
    const {
      errorMock: error,
      showFeedbackMock: showFeedback,
      NavigationMock: Navigation,
      spyNavigationMockLogout,
    } = makeMock(true);

    expect(showFeedback).not.toHaveBeenCalled();
    expect(spyNavigationMockLogout).not.toHaveBeenCalled();

    try {
      // when
      verifyExpiredToken({ error, showFeedback, Navigation });
    } catch (err) {
      // then
      expect(err.response).toEqual({
        data: { message: 'Por questões de segurança, entre novamente' },
        status: 403,
      });

      expect(showFeedback).toHaveBeenCalledTimes(1);
      expect(showFeedback).toHaveBeenCalledWith('any_response_data_message');

      expect(spyNavigationMockLogout).toHaveBeenCalledTimes(1);
    }
  });

  test('when token not expired then return `default` error', () => {
    // should
    const {
      errorMock: error,
      showFeedbackMock: showFeedback,
      NavigationMock: Navigation,
      spyNavigationMockLogout,
    } = makeMock();

    expect(showFeedback).not.toHaveBeenCalled();
    expect(spyNavigationMockLogout).not.toHaveBeenCalled();

    try {
      // when
      verifyExpiredToken({ error, showFeedback, Navigation });
    } catch (err) {
      // then
      expect(err).toEqual(error);

      expect(showFeedback).not.toHaveBeenCalled();
      expect(spyNavigationMockLogout).not.toHaveBeenCalled();
    }
  });

  test('when response no exist then return `default` error', () => {
    // should
    const {
      errorMock: error,
      showFeedbackMock: showFeedback,
      NavigationMock: Navigation,
      spyNavigationMockLogout,
    } = makeMock();

    expect(showFeedback).not.toHaveBeenCalled();
    expect(spyNavigationMockLogout).not.toHaveBeenCalled();

    delete error.response;

    try {
      // when
      verifyExpiredToken({ error, showFeedback, Navigation });
    } catch (err) {
      // then
      expect(err).toEqual(error);

      expect(showFeedback).not.toHaveBeenCalled();
      expect(spyNavigationMockLogout).not.toHaveBeenCalled();
    }
  });
});
