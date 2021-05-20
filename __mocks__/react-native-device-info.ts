jest.mock('react-native-device-info', () => ({
  getSystemName: jest.fn().mockReturnValue('Android'),
  getDeviceId: jest.fn().mockReturnValue('Nexus'),
  getSystemVersion: jest.fn().mockReturnValue('8.1'),
  getVersion: jest.fn().mockReturnValue('2.0'),
  getDeviceLocale: jest.fn().mockReturnValue('EN-EN'),
}));
