import ExpiredSessionError from '../ExpiredSessionError';

describe('Entities: ExpiredSessionError', () => {
  test('when instance method then return corrects values', () => {
    // when
    const result = new ExpiredSessionError();

    // then
    expect(result.response.status).toEqual(403);
    expect(result.response.data.message).toEqual(
      'Por questões de segurança, entre novamente',
    );
  });
});
