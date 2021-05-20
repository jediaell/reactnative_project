import { AsyncStorage } from '~/utils';
import Keys from './keys';

export default class Storage {
  static clearWholeStorage(): void {
    AsyncStorage.clear();
  }

  static async getAllStorage(): Promise<any> {
    return AsyncStorage.getAllKeys();
  }

  static async setToken(token: Token): Promise<void> {
    AsyncStorage.setItem(Keys.TOKEN, JSON.stringify(token));
  }

  static async getToken(): Promise<Token | null> {
    const item = await AsyncStorage.getItem(Keys.TOKEN);
    return item ? JSON.parse(item) : '';
  }

  static async setMessagingToken(token: string): Promise<void> {
    AsyncStorage.setItem(Keys.MESSAGING_TOKEN, token);
  }

  static async getMessagingToken(): Promise<string | null> {
    let token = await AsyncStorage.getItem(Keys.MESSAGING_TOKEN);
    token = token ? JSON.parse(token) : '';
    return token;
  }

  static async setCodepushUpdated(bool: boolean): Promise<void> {
    await AsyncStorage.setItem(Keys.CODEPUSH, JSON.stringify(bool));
  }

  static async getCodepushUpdated(): Promise<boolean> {
    const flag = await AsyncStorage.getItem(Keys.CODEPUSH);
    return flag && JSON.parse(flag);
  }
}
