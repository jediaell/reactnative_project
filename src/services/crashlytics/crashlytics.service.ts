import Firebase from '@react-native-firebase/app';
import '@react-native-firebase/crashlytics';
import { ENVS, Env } from '~/utils';

const Crashlytics = Firebase.crashlytics();
const currentEnv = Env.ENV;
const isRelease = process.env.NODE_ENV === 'production';

if (isRelease && currentEnv === ENVS.PRD) {
  Crashlytics.setCrashlyticsCollectionEnabled(true);
} else {
  Crashlytics.setCrashlyticsCollectionEnabled(false);
}

export default class CrashlyticsService {
  static log(message: string): void {
    Crashlytics.log(message);
  }
  static recordError(error: Error): void {
    Crashlytics.recordError(error);
  }

  static async setUserId(userId: string): Promise<void> {
    await Crashlytics.setUserId(userId);
  }

  static async setAttribute(name: string, value: string): Promise<void> {
    await Crashlytics.setAttribute(name, value);
  }

  static async setAttributes(attributes: {
    [key: string]: string;
  }): Promise<void> {
    await Crashlytics.setAttributes(attributes);
  }

  static async test(): Promise<void> {
    await Crashlytics.setCrashlyticsCollectionEnabled(true);
    Crashlytics.crash();
  }

  static async crash(): Promise<void> {
    await Crashlytics.setCrashlyticsCollectionEnabled(true);
    Crashlytics.crash();
  }
}
