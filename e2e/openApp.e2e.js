describe('Testing if the app opens to make sure that nothing has broke on the build', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should enter login screen', async () => {
    await expect(element(by.text('ENTRAR'))).toBeVisible();
  });
});
