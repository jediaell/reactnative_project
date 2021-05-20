import RemoteConfig, {
  FirebaseRemoteConfigTypes,
} from '@react-native-firebase/remote-config';

const remoteConfig = RemoteConfig();

export default class RemoteConfigService {
  static async setup(
    params: FirebaseRemoteConfigTypes.ConfigDefaults,
  ): Promise<void> {
    await remoteConfig.setDefaults(params);
    await remoteConfig.fetchAndActivate();
  }

  static async getValue(key: string): Promise<string> {
    return await remoteConfig.getValue(key).asString();
  }
}
